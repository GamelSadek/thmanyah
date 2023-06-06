import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import axios from "axios"
const dynamoDb = new DynamoDB.DocumentClient();
import * as RedisCache from "../core/cacheHandler";
await RedisCache.initializeRedis()


export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    const { searchKey } = event.queryStringParameters as unknown as { searchKey: string };

    const result = await RedisCache.getFromCache({ key: searchKey })
    if (result) {
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    }
    const url = encodeURI(`https://itunes.apple.com/search?media=podcast&term=${searchKey}`);
    const { data } = await axios.get(url);

    await Promise.all([
        RedisCache.setCache({ key: searchKey, value: JSON.stringify(data) }),
        insertIntoDB({ podcasts: data.results })
    ]).catch(console.log);

    return {
        statusCode: 200,
        body: JSON.stringify(data.results),
    };

};

async function insertIntoDB({ podcasts }: { podcasts: any }) {
    const tableName = Table.Podcast.tableName;
    const arrayOfArrays = splitArrayintoSubArrays({ bigArray: podcasts, size: 25 })
    for (const podcasts of arrayOfArrays) {
        let writeOperations: any[] = [];
        for (const podcast of podcasts) {
            writeOperations.push({
                PutRequest: {
                    Item: podcast
                }
            })
        }
        const params: any = {
            RequestItems: {}
        }

        params['RequestItems'][tableName] = writeOperations
        await dynamoDb.batchWrite(params).promise();
    };
}


function splitArrayintoSubArrays({ bigArray, size }: { bigArray: any[], size: number }) {
    const arrayOfArrays = [];
    for (var i = 0; i < bigArray.length; i += size) {
        arrayOfArrays.push(bigArray.slice(i, i + size));
    }
    return arrayOfArrays
}

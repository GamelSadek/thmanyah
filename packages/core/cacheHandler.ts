import { createClient } from "redis";
let client: any

export async function initializeRedis() {
    client = createClient({
        url: process.env.REDIS_URL
    });
    await client.connect()
}

export async function setCache({ key, value }: { key: string, value: string }) {
    return client.set(key, value, { EX: 60 * 60 * 24 })
}

export async function getFromCache({ key }: { key: string }) {
    const value: any = await client.get(key);
    if (value) {
        return JSON.parse(value);
    }
    return;
}
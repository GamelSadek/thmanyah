import { Api, StackContext, Table } from "sst/constructs";

export async function ITunes({ stack }: StackContext) {
  const podcastTable = new Table(stack, "Podcast", {
    fields: {
      wrapperType: "string",
      kind: "string",
      collectionId: "number",
      trackId: "number",
      artistName: "string",
      collectionName: "string",
      trackName: "string",
      collectionCensoredName: "string",
      trackCensoredName: "string",
      collectionViewUrl: "string",
      feedUrl: "string",
      trackViewUrl: "string",
      artworkUrl30: "string",
      artworkUrl60: "string",
      artworkUrl100: "string",
      collectionPrice: "number",
      trackPrice: "number",
      collectionHdPrice: "number",
      releaseDate: "string",
      collectionExplicitness: "string",
      trackExplicitness: "string",
      trackCount: "number",
      trackTimeMillis: "number",
      country: "string",
      currency: "string",
      primaryGenreName: "string",
      contentAdvisoryRating: "string",
      artworkUrl600: "string",
      genreIds: "binary",
      genres: "binary"
    },
    primaryIndex: { partitionKey: "collectionId" },
  });

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [podcastTable],
      },
    },
    routes: {
      "POST /itunes-search": "packages/functions/itunes-search.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
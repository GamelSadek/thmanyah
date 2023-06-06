import { SSTConfig } from "sst";
import { ITunes } from "./stacks/ITunes";

export default {
  config(_input) {
    return {
      name: "iTunes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(ITunes);
  }
} satisfies SSTConfig;

import { parse, parseSideColumns } from "./../parser";
import {executeCli } from "./executeCli";
export class CcloudCluster {
    ccloud: CCloudCliWrapper;
  
    async list(): Promise<any[]> {
      let result = await executeCli(["kafka", "cluster", "list"]);
      parse(result);
      console.log("\n::SEP::\n");
      console.log(result);
  
      return result;
    }
  
    constructor(ccloud: CCloudCliWrapper) {
      this.ccloud = ccloud;
    }
  }
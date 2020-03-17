import { parse, parseSideColumns } from "./../parser";
import {executeCli } from "./executeCli";

export class CcloudApiKeys implements ApiKeys {
    ccloud: CCloudCliWrapper;
  
    async createApiKey(serviceAccountId: number, description: string): Promise<ApiKeySet> {
      let cliOutput = await executeCli([
        "api-key",
        "create",
        "--resource", process.env.TIKA_CCLOUD_CLUSTER_ID,
        "--service-account-id", serviceAccountId + "",
        "--description", description]
      );
  
      let cliObjects: any = parseSideColumns(cliOutput);
      let apiKeySet: ApiKeySet = { Key: cliObjects.APIKey, Secret: cliObjects.Secret }
  
      return apiKeySet;
    }
  
    async deleteApiKey(key: string): Promise<void> {
      await executeCli(["api-key", "delete", key]);
    }
    async getApiKeys(): Promise<ApiKey[]> {
      let cliOutput = await executeCli(["api-key", "list"]);
      let cliObjects = parse(cliOutput);
  
      let apiKeys = cliObjects.map(function (obj) {
        return { Key: obj.Key, Description: obj.Description, Owner: obj.Owner } as ApiKey
      });
  
      console.log(apiKeys);
  
      return apiKeys;
    }
  
    constructor(ccloud: CCloudCliWrapper) {
      this.ccloud = ccloud;
    }
  }
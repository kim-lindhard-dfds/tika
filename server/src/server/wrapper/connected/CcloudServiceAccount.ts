import { parse, parseSideColumns } from "./../parser";
import {executeCli } from "./executeCli";
export class CcloudServiceAccount implements ServiceAccounts {
    ccloud: CCloudCliWrapper;
  
    async getServiceAccounts(): Promise<ServiceAccount[]> {
      let result = await executeCli(["service-account", "list"]);
      result = parse(result);
  
      return (result as any) as ServiceAccount[];
    }
  
    async createServiceAccount(accountName: string, description: string = ""): Promise<ServiceAccount> {
      let result = await executeCli(["service-account", "create", accountName, "--description", description]);
      result = parseSideColumns(result);
  
      return (result as any) as ServiceAccount;
    }
  
    async deleteServiceAccount(accountId: number): Promise<boolean> {
      await executeCli(["service-account", "delete", accountId.toString()]);
      return true;
    }
  
    async update(description: string): Promise<boolean> {
      throw new Error("Not implemented");
    }
  
    constructor(ccloud: CCloudCliWrapper) {
      this.ccloud = ccloud;
    }
  }
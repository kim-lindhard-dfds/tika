import { parse, parseSideColumns } from "./../parser";
import { executeCli } from "./executeCli";
import { CliException } from "./../model/error";

export class CcloudServiceAccount implements ServiceAccounts {
  ccloud: CCloudCliWrapper;

  async getServiceAccounts(): Promise<ServiceAccount[]> {
    let result = await executeCli(["service-account", "list"]);
    result = parse(result);

    return (result as any) as ServiceAccount[];
  }

  async createServiceAccount(accountName: string, description: string = ""): Promise<ServiceAccount> {


    let cliResult;
    try {
      cliResult = await executeCli(["service-account", "create", accountName, "--description", description]);

    }
    catch (err) {

      if (err instanceof CliException) {
        console.log("Caught a CliException");
        if (err.consoleLines.some((l: string): boolean => l.includes("Service name is already in use"))){
          // Get the service account with the same name
          // check if description is the same
          // if the description is the same then return that service account
          // i not throw new ServiceAccountAlreadyExistsException
        }
      }
    }


    let result = parseSideColumns(cliResult);

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
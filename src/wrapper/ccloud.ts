import { spawn } from "child_process";
import * as readline from "readline";
import { parse, parseSideColumns } from "./parser";
import { CcloudSessionExpiredException } from "./model/error";

export default class Ccloud implements CCloudCliWrapper {
  binPath: string;

  ServiceAccounts: CcloudServiceAccount;
  ApiKeys: CcloudApiKeys;
  Acl: CcloudAcl;
  Topic: CcloudTopic;
  Cluster: CcloudCluster;

  constructor() {
    this.ServiceAccounts = new CcloudServiceAccount(this);
    this.ApiKeys = new CcloudApiKeys(this);
    this.Cluster = new CcloudCluster(this);
  }
}

class CcloudServiceAccount implements ServiceAccounts {
  ccloud: Ccloud;

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

  constructor(ccloud: Ccloud) {
    this.ccloud = ccloud;
  }
}

class CcloudApiKeys implements ApiKeys {
  ccloud: Ccloud;

  createApiKey(serviceAccountId: number, description: string): ApiKeySet {
    throw new Error("Method not implemented.");
  }  deleteApiKey(key: string): void {
    throw new Error("Method not implemented.");
  }
  getApiKeys(): ApiKey[] {
    throw new Error("Method not implemented.");
  }

  constructor(ccloud: Ccloud) {
    this.ccloud = ccloud;
  }
}

class CcloudAcl {
  ccloud: Ccloud;

  list(): string[] {
    return [];
  }

  constructor(ccloud: Ccloud) {
    this.ccloud = ccloud;
  }
}

class CcloudTopic {
  ccloud: Ccloud;

  list(): string[] {
    return [];
  }

  constructor(ccloud: Ccloud) {
    this.ccloud = ccloud;
  }
}

class CcloudCluster {
  ccloud: Ccloud;

  async list(): Promise<any[]> {
    let result = await executeCli(["kafka", "cluster", "list"]);
    parse(result);
    console.log("\n::SEP::\n");
    console.log(result);

    return result;
  }

  constructor(ccloud: Ccloud) {
    this.ccloud = ccloud;
  }
}

function executeCli(args: string[]): Promise<string[]> {
  const cli = process.env.TIKA_CCLOUD_BIN_PATH;

  return new Promise((resolve, reject) => {
    const lines = new Array();
    const errLines = new Array();
    const runner = spawn(cli, args);
    const reader = readline.createInterface({ input: runner.stdout });
    const errReader = readline.createInterface({ input: runner.stderr });

    reader.on("line", data => lines.push((data as any).toString("utf8")));
    errReader.on("line", data => errLines.push((data as any).toString("utf8")));

    runner.on("exit", exitCode => {
      if (exitCode.toString() != "0") {
        console.log(errLines);
        cliErrHandler(exitCode, errLines);
        reject(exitCode.toString());
      } else {
        resolve(lines);
      }
    });
  });
}

function cliErrHandler(exitCode: number, lines: string[]): boolean {
  let b64_line: string = toB64(lines[0]);
  if (
    b64_line.valueOf() ===
    "RXJyb3I6IFlvdXIgc2Vzc2lvbiBoYXMgZXhwaXJlZC4gUGxlYXNlIGxvZ2luIGFnYWluLg==".valueOf()
  ) {
    throw new CcloudSessionExpiredException();
  }

  return true;
}

function toB64(value: string): string {
  return new Buffer(value, "binary").toString("base64");
}

export { Ccloud };

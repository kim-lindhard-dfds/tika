import { spawn } from "child_process";
import * as readline from "readline";
import { parse, parseSideColumns } from "./parser";
import { CcloudSessionExpiredException } from "./model/error";
import * as fs from "fs";

export default class Ccloud implements CCloudCliWrapper {
  binPath: string;

  ServiceAccounts: CcloudServiceAccount;
  ApiKeys: CcloudApiKeys;
  Acl: CcloudAcl;
  Topic: CcloudTopic;
  Cluster: CcloudCluster;
  Kafka: Kafka;

  constructor() {
    this.ServiceAccounts = new CcloudServiceAccount(this);
    this.ApiKeys = new CcloudApiKeys(this);
    this.Cluster = new CcloudCluster(this);
    this.Kafka = new KafKa();
  }

  login() {
    const cli = process.env.TIKA_CCLOUD_BIN_PATH;
    let ccUser = process.env.TIKA_CC_USER;
    let ccPass = process.env.TIKA_CC_PASS;

  }
}

class CcloudAccessControlLists implements AccessControlLists {
  getAccessControlLists(): Promise<AccessControlList[]> {
    throw new Error("Method not implemented.");
  }
}

class KafKa implements Kafka {
  AccessControlLists: AccessControlLists;
  constructor() {
    this.AccessControlLists = new CcloudAccessControlLists();
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
      return { Key: obj.Key, Description: obj.Description } as ApiKey
    });

    console.log(apiKeys);

    return apiKeys;
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
    || b64_line.valueOf() ===
    "RXJyb3I6IFlvdSBtdXN0IGxvZ2luIHRvIHJ1biB0aGF0IGNvbW1hbmQu".valueOf()
  ) {
    throw new CcloudSessionExpiredException();
  }

  return true;
}

function toB64(value: string): string {
  return new Buffer(value, "binary").toString("base64");
}

export { Ccloud };

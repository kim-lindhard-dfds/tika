import { spawn } from "child_process";
import * as readline from "readline";
import { parse } from "./parser";
import ServiceAccount from "./model/service-account";

export default class Ccloud {
  binPath: string;

  ServiceAccount: CcloudServiceAccount;
  Acl: CcloudAcl;
  Topic: CcloudTopic;
  Cluster: CcloudCluster;

  constructor() {
    this.ServiceAccount = new CcloudServiceAccount(this);
    this.Cluster = new CcloudCluster(this);
  }
}

class CcloudServiceAccount {
  ccloud: Ccloud;

  async list(): Promise<ServiceAccount[]> {
    let result = await executeCli(["service-account", "list"]);
    parse(result);
    console.log("\n::SEP::\n");
    console.log(result);

    return (result as any) as ServiceAccount[];
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
  const cli = process.env.CCLOUDCLI;

  return new Promise((resolve, reject) => {
    const lines = new Array();
    const runner = spawn(cli, args);
    const reader = readline.createInterface({ input: runner.stdout });

    reader.on("line", data => lines.push((data as any).toString("utf8")));

    runner.on("exit", exitCode => {
      if (exitCode.toString() != "0") {
        reject(exitCode.toString());
      } else {
        resolve(lines);
      }
    });
  });
}

export { Ccloud };

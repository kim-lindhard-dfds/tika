import { spawn } from "child_process";
import * as readline from "readline";
import { parse, parseSideColumns } from "./parser";
import ServiceAccount from "./model/service-account";
import { CcloudSessionExpiredException } from "./model/error";

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
    result = parse(result);
    console.log(result);

    return (result as any) as ServiceAccount[];
  }

  async create(accountName: string, description: string = ""): Promise<ServiceAccount> {
    let result = await executeCli(["service-account", "create", accountName, "--description", description]);
    result = parseSideColumns(result);
    console.log(result);

    return (result as any) as ServiceAccount;
  }

  async delete(accountId: number): Promise<boolean> {
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

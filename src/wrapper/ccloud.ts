import { spawn } from "child_process";
import * as readline from "readline";

export default class Ccloud {
  binPath: string;

  ServiceAccount: CcloudServiceAccount;
  Acl: CcloudAcl;
  Topic: CcloudTopic;

  constructor() {
    this.ServiceAccount = new CcloudServiceAccount(this);
  }
}

class CcloudServiceAccount {
  ccloud: Ccloud;

  async list(): Promise<string[]> {
    let result = await executeCli(["service-account", "list"]);
    console.log(result);

    return result;
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

  constructor(ccloud : Ccloud) {
    this.ccloud = ccloud;
  }
}

class CcloudTopic {
  ccloud: Ccloud;

  list(): string[] {
    return [];
  }

  constructor(ccloud : Ccloud) {
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
        resolve(lines.slice(1));
      }
    });
  });
}

export { Ccloud };

import { spawn } from "child_process";
import * as readline from "readline";
import { CcloudSessionExpiredException, CliException } from "./../model/error";

export function executeCli(args: string[]): Promise<string[]> {
  const cli = process.env.TIKA_CCLOUD_BIN_PATH ?? "ccloud";

  return new Promise((resolve, reject) => {
    const lines = new Array();
    const errLines = new Array();
    const runner = spawn(cli, args);
    const reader = readline.createInterface({ input: runner.stdout });
    const errReader = readline.createInterface({ input: runner.stderr });

    reader.on("line", data => lines.push((data as any).toString("utf8")));
    errReader.on("line", data => errLines.push((data as any).toString("utf8")));

    runner.on("exit", exitCode => {
      if (exitCode.toString() == "0") {
        resolve(lines);
      }

      cliErrHandler(exitCode, errLines, reject);
    });
  });
}


function cliErrHandler(exitCode: number, lines: string[], reject: any) {
  let b64_line: string = toB64(lines[0]);
  if (
    b64_line.valueOf() ===
    "RXJyb3I6IFlvdXIgc2Vzc2lvbiBoYXMgZXhwaXJlZC4gUGxlYXNlIGxvZ2luIGFnYWluLg==".valueOf()
    || b64_line.valueOf() ===
    "RXJyb3I6IFlvdSBtdXN0IGxvZ2luIHRvIHJ1biB0aGF0IGNvbW1hbmQu".valueOf()
  ) {
    reject(new CcloudSessionExpiredException());
  }

  reject(new CliException(exitCode, lines));
}


function toB64(value: string): string {
  return new Buffer(value, "binary").toString("base64");
}
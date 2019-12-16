import { spawn } from "child_process";
import * as readline from "readline";
import * as express from "express";

const app = express();

app.use(express.json());

const port = process.env.port || 3000;
const cli = process.env.CCLOUDCLI;

function executeCli(args: string[]): Promise<string[]> {
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

app.get("/api/topics", (req, res) => {
  executeCli(["topic", "list"])
    .then(list => {
      res.send({
        items: list,
        count: list.length
      });
    })
    .catch(err => {
      res.status(500).send({
        error: err.toString()
      });
    });
});

app.post("/api/topics", (req, res) => {
  const { name } = req.body;
  executeCli(["topic", "create", name])
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      res.status(500).send({
        error: err.toString()
      });
    });
});

app.listen(port, () => {
  console.log(`tika is listening on port ${port}...`);
});

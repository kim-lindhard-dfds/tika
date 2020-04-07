import { parse, parseTopicDescription } from "./../parser";
import { executeCli } from "./executeCli";
import { TopicAlreadyExistsException } from "../model/error";


export class CcloudTopics implements Topics {

    async getTopics(): Promise<string[]> {

        let result = await executeCli(["kafka", "topic", "list", "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID]);
        result =
            parse(result)
                .filter(t => t.Name.startsWith("_confluent") === false)
                .map(t => t.Name);

        return result;
    }

    async describeTopic(name: string): Promise<Topic> {
        let consoleLines = await executeCli(["kafka", "topic", "describe", name, "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID]);

        var topic = parseTopicDescription(consoleLines);

        return topic;
    }

    async createTopic(topic: Topic): Promise<void> {

        return await new Promise(async (resolve, reject) => {

            try {
                if (topic.Configurations === undefined || topic.Configurations === null) {
                    await executeCli([
                        "kafka", "topic",
                        "create", topic.Name,
                        "--partitions", topic.PartitionCount + "",
                        "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID
                    ]);

                    return resolve();
                }

                var keyEqualValueStrings: string[] = [];

                Object
                    .keys(topic.Configurations)
                    .forEach(function (key: string) {
                        keyEqualValueStrings.push(key + "=" + topic.Configurations[key])
                    });
                var configsString: string = keyEqualValueStrings.join(",");

                await executeCli([
                    "kafka", "topic",
                    "create", topic.Name,
                    "--partitions", topic.PartitionCount + "",
                    "--config", configsString,
                    "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID
                ]);

                return resolve();

            }
            catch (error) {
                if (
                    error.name.valueOf() !== "CliException" ||
                    error.consoleLines.some((l: string): boolean => l.includes("already exists")) === false
                ) {
                    throw (error);
                }

                let existingTopic = await this.describeTopic(topic.Name);

                if (existingTopic.PartitionCount !== topic.PartitionCount) {
                    return reject(new TopicAlreadyExistsException());
                }

                Object
                    .keys(
                        topic.Configurations)
                    .forEach(function (key) {
                        if (existingTopic.Configurations[key] != topic.Configurations[key]) {
                            return reject(new TopicAlreadyExistsException());
                        }
                    });

                return resolve();
            }
        });
    }

    async deleteTopic(name: string): Promise<void> {
        await executeCli([
            "kafka", "topic",
            "delete", name,
            "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID
        ]);
    }
}

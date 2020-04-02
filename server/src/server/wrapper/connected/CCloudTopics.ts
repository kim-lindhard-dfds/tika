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
        let topicNames = await this.getTopics();

        let topicFound = topicNames.find(topicName => topicName.valueOf() === topic.Name.valueOf());
        if (topicFound === undefined) {
            await executeCli([
                "kafka", "topic",
                "create", topic.Name,
                "--partitions", topic.PartitionCount + "",
                "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID
            ]);
        } else {
            throw new TopicAlreadyExistsException();
        }
    }

    async deleteTopic(name: string): Promise<void> {
        await executeCli([
            "kafka", "topic",
            "delete", name,
            "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID
        ]);
    }
}

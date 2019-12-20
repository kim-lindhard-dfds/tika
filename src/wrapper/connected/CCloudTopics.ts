import { parse } from "./../parser";
import { executeCli } from "./executeCli";

export class CcloudTopics implements Topics {

    async getTopics(): Promise<string[]> {

        let result = await executeCli(["kafka", "topic", "list", "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID]);
        result =
            parse(result)
                .filter(t => t.Name.startsWith("_confluent") === false)
                .map(t => t.Name);

        return result;
    }

    async createTopic(name: string, partitionCount: number): Promise<void> {
        await executeCli([
            "kafka", "topic",
            "create", name,
            "--partitions", partitionCount + "",
            "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID
        ]);
    }

    async deleteTopic(name: string): Promise<void> {
        await executeCli([
            "kafka", "topic",
            "delete", name,
            "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID
        ]);
    }
}

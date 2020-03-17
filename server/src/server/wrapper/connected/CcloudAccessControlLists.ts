import { parse } from "./../parser";
import { executeCli } from "./executeCli";


export class CcloudAccessControlLists implements AccessControlLists {
    async getAccessControlLists(): Promise<AccessControlList[]> {
        let result = await executeCli(["kafka", "acl", "list", "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID]);
        let resultObjects = parse(result) as AccessControlList[];

        resultObjects.forEach(elem => {
            elem.ServiceAccountId = elem.ServiceAccountId.split(':')[1];
        });

        return resultObjects;
    }

    async createAccessControlList(
        serviceAccountId: number,
        allow: boolean,
        operation: string,
        topicPrefix: string,
        consumerGroupPrefix: string
    ): Promise<void> {

        let command = this.createCommand(
            "create",
            serviceAccountId,
            allow,
            operation,
            topicPrefix,
            consumerGroupPrefix
        );

        await executeCli(command);
    }

    async deleteAccessControlList(
        serviceAccountId: number,
        allow: boolean,
        operation: string,
        topicPrefix: string,
        consumerGroupPrefix: string
    ): Promise<void> {

        let command = this.createCommand(
            "delete",
            serviceAccountId,
            allow,
            operation,
            topicPrefix,
            consumerGroupPrefix
        );

        await executeCli(command);
    }

    private createCommand(
        createOrDelete: string,
        serviceAccountId: number,
        allow: boolean,
        operation: string,
        topicPrefix: string,
        consumerGroupPrefix: string
    ): string[] {
        let command = [
            "kafka", "acl", createOrDelete,
            "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID,
            "--service-account", serviceAccountId + "",
            "--operation", operation
        ];

        command.push(allow ? "--allow" : "--deny");

        if (0 < topicPrefix.length) {
            command.push("--topic");
            command.push(topicPrefix);
            command.push("--prefix");
        } else if (0 < consumerGroupPrefix.length) {
            command.push("--consumer-group");
            command.push(consumerGroupPrefix);
            command.push("--prefix");
        } else {
            command.push("--cluster-scope");
        }

        return command;
    }
}
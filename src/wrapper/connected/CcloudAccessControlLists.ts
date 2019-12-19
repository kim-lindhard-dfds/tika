import { parse } from "./../parser";
import {executeCli } from "./executeCli";


export class CcloudAccessControlLists implements AccessControlLists {
    async getAccessControlLists(): Promise<AccessControlList[]> {
        let result = await executeCli(["kafka", "acl", "list", "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID]);
        let resultObjects = parse(result) as AccessControlList[];

        return resultObjects;
    }

    async createAccessControlList(
        serviceAccountId: number,
        allow: boolean,
        operation: string,
        topicPrefix: string
    ): Promise<void>{
    
        let command = [
            "kafka", "acl", "create",
            "--cluster", process.env.TIKA_CCLOUD_CLUSTER_ID,
            "--service-account-id", serviceAccountId + "",
            "--operation", operation
        ];

        command.push(allow? "--allow":"--deny");

        if(0 < topicPrefix.length){
            command.push("--topic");
            command.push(topicPrefix);
            command.push("--prefix"); 
        }else{
            command.push("--cluster-scope");
        }

        let result = await executeCli(command);
    }
  }
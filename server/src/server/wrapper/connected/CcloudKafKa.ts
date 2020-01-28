import { CcloudAccessControlLists } from "./CcloudAccessControlLists";
import { CcloudTopics } from "./CCloudTopics";

export class CcloudKafKa implements Kafka {
  AccessControlLists: AccessControlLists;
  Topics: Topics;

  constructor() {
    this.AccessControlLists = new CcloudAccessControlLists();
    this.Topics = new CcloudTopics();
  }
}
import { CcloudAccessControlLists } from "./CcloudAccessControlLists";

export class CcloudKafKa implements Kafka {
  AccessControlLists: AccessControlLists;
  constructor() {
    this.AccessControlLists = new CcloudAccessControlLists();
  }
}
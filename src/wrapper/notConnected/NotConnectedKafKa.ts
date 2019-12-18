import { NotConnectedAccessControlLists } from "./NotConnectedAccessControlLists";

export class NotConnectedKafKa implements Kafka {
  AccessControlLists: AccessControlLists;
  constructor() {
    this.AccessControlLists = NotConnectedAccessControlLists.getInstance();
  }
}
import { NotConnectedAccessControlLists } from "./NotConnectedAccessControlLists";
import {NotConnectedTopics} from "./NotConnectedTopics"
export class NotConnectedKafKa implements Kafka {
  AccessControlLists: AccessControlLists;
  Topics: Topics;

  constructor() {
    this.AccessControlLists = NotConnectedAccessControlLists.getInstance();
    this.Topics = NotConnectedTopics.getInstance();
  }
}
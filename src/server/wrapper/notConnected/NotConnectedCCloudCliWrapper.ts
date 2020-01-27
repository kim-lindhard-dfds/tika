import {NotConnectedServiceAccounts} from "./NotConnectedServiceAccounts"
import {NotConnectedApiKeys} from "./NotConnectedApiKeys"
import { NotConnectedKafKa } from "./NotConnectedKafKa";

export class NotConnectedCCloudCliWrapper implements CCloudCliWrapper{
    Kafka: Kafka = new NotConnectedKafKa();
    ApiKeys: ApiKeys = NotConnectedApiKeys.getInstance();
    ServiceAccounts: ServiceAccounts = NotConnectedServiceAccounts.getInstance();
}
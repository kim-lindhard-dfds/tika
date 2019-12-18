import {NotConnectedServiceAccounts} from "./NotConnectedServiceAccounts"
import {NotConnectedApiKeys} from "./NotConnectedApiKeys"

export class NotConnectedCCloudCliWrapper implements CCloudCliWrapper{
    Kafka: Kafka;
    ApiKeys: ApiKeys = NotConnectedApiKeys.getInstance();
    ServiceAccounts: ServiceAccounts = NotConnectedServiceAccounts.getInstance();
}
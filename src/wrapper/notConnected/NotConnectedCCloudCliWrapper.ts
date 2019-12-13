import {NotConnectedServiceAccounts} from "./NotConnectedServiceAccounts"
import {NotConnectedApiKeys} from "./NotConnectedApiKeys"

export class NotConnectedCCloudCliWrapper implements CCloudCliWrapper{
    ApiKeys: ApiKeys = NotConnectedApiKeys.getInstance();
    ServiceAccounts: ServiceAccounts = NotConnectedServiceAccounts.getInstance();
}
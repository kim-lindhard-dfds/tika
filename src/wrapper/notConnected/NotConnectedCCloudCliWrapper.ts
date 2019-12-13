import {NotConnectedServiceAccounts} from "./NotConnectedServiceAccounts"

export class NotConnectedCCloudCliWrapper implements CCloudCliWrapper{
    ServiceAccounts: ServiceAccounts = NotConnectedServiceAccounts.getInstance();
}
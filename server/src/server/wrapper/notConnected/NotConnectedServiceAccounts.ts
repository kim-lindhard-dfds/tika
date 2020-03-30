import { ServiceAccountAlreadyExistsException } from "./../model/error";


export class NotConnectedServiceAccounts implements ServiceAccounts {
    private static instance: NotConnectedServiceAccounts;


    public static getInstance(): NotConnectedServiceAccounts {
        if (!NotConnectedServiceAccounts.instance) {
            NotConnectedServiceAccounts.instance = new NotConnectedServiceAccounts();
        }

        return NotConnectedServiceAccounts.instance;
    }

    serviceAccounts: ServiceAccount[];

    constructor() {
        this.serviceAccounts = [];
    }

    async createServiceAccount(name: string, description: string): Promise<ServiceAccount> {

        if (this.serviceAccounts.some(e => e.Name === name)) {
            throw new ServiceAccountAlreadyExistsException();
        }
        
        let id = Math.floor(100000 + Math.random() * 900000);

        let serviceAccount: ServiceAccount =
        {
            Id: id,
            Name: name,
            Description: description
        };

        this.serviceAccounts.push(serviceAccount);

        return serviceAccount;
    }

    async deleteServiceAccount(id: number): Promise<boolean> {
        this.serviceAccounts = this.serviceAccounts.filter(s => s.Id !== id);
        return true;
    }

    async getServiceAccounts(): Promise<ServiceAccount[]> {
        return this.serviceAccounts;
    }
}


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

    createServiceAccount(name: string, description: string): ServiceAccount {
        let id = Math.floor(100000 + Math.random() * 900000);

        let serviceAccount: ServiceAccount =
        {
            id: id,
            name: name,
            description: description
        };

        this.serviceAccounts.push(serviceAccount);

        return serviceAccount;
    } 
    
    deleteServiceAccount(id: number): void {
        this.serviceAccounts = this.serviceAccounts.filter(s => s.id !== id);
    }
    
    getServiceAccounts(): ServiceAccount[] {
        return this.serviceAccounts;
    }
}


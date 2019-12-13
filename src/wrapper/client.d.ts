type ServiceAccount = {
    id: number;
    name: string;
    description: string;
}

interface ServiceAccounts {
    createServiceAccount(  
        name: string,
        description: string
    ): ServiceAccount;

    deleteServiceAccount(
        id: number
    ): void

    getServiceAccounts()
    : ServiceAccount[]
}

interface CCloudCliWrapper{
    ServiceAccounts : ServiceAccounts;
}
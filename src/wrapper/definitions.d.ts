type ServiceAccount = {
    Id: number;
    Name: string;
    Description: string;
}

type ApiKeySet = {
    Key: string;
    Secret: string;
}

type ApiKey = {
    Key: string;
    Description: string;
}

interface ServiceAccounts {
    createServiceAccount(  
        name: string,
        description: string
    ): Promise<ServiceAccount>;

    deleteServiceAccount(
        id: number
    ): Promise<boolean>

    getServiceAccounts()
    : Promise<ServiceAccount[]>
}

interface ApiKeys {
    createApiKey(
        serviceAccountId: number,
        description: string
    ): Promise<ApiKeySet>;

    deleteApiKey(
        key: string
    ): Promise<void>;

    getApiKeys()
    : Promise<ApiKey[]>
}

interface CCloudCliWrapper{
    ServiceAccounts : ServiceAccounts;
    ApiKeys : ApiKeys;
}
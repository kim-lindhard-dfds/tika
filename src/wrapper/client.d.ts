type ServiceAccount = {
    id: number;
    name: string;
    description: string;
}

type ApiKeySet = {
    key: string;
    secret: string;
}

type ApiKey = {
    key: string;
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

interface ApiKeys {
    createApiKey(
        serviceAccountId: number,
        description: string
    ): ApiKeySet;

    deleteApiKey(
        key: string
    ): void;

    getApiKeys()
    : ApiKey[]
}

interface CCloudCliWrapper{
    ServiceAccounts : ServiceAccounts;
    ApiKeys : ApiKeys;
}
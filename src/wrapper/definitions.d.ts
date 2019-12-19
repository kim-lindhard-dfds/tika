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

type AccessControlList = {
    ServiceAccountId: string;
    Permission: string;
    Operation: string;
    Resource: string;
    Name: string;
    Type: string;
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

interface AccessControlLists {
    createAccessControlList(
        serviceAccountId: number,
        allow: boolean,
        operation: string,
        topicPrefix: string,
        consumerGroupPrefix: string
    ): Promise<void>

    deleteAccessControlList(
        serviceAccountId: number,
        allow: boolean,
        operation: string,
        topicPrefix: string,
        consumerGroupPrefix: string
    ): Promise<void>

    getAccessControlLists()
    : Promise<AccessControlList[]>
}

interface Kafka{
    AccessControlLists : AccessControlLists;
}

interface CCloudCliWrapper{
    ServiceAccounts : ServiceAccounts;
    ApiKeys : ApiKeys;
    Kafka : Kafka;
}
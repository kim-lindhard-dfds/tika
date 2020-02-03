using System.Net.Http;
using Tika.RestClient.Features.Acls;
using Tika.RestClient.Features.ApiKeys;
using Tika.RestClient.Features.ServiceAccounts;
using Tika.RestClient.Features.Topics;

namespace Tika.RestClient
{
    internal class Client : IRestClient
    {
        private HttpClient _httpClient;
        public ITopicsClient Topics { get; }
        public IServiceAccountsClient ServiceAccounts { get; }
        public IApiKeysClient ApiKeys { get; }
        public IAclsClient Acls { get; }

        public Client(HttpClient httpClient)
        {
            _httpClient = httpClient;
            Topics = new TopicsClient(httpClient);
            ServiceAccounts = new ServiceAccountsClient(httpClient);
            ApiKeys = new ApiKeysClient(httpClient);
            Acls = new AclsClient(httpClient);
        }
        
        public void Dispose()
        {
            _httpClient?.Dispose();
        }
    }
}
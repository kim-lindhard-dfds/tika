using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Tika.RestClient.Features.ServiceAccounts.Models;

namespace Tika.RestClient.Features.ServiceAccounts
{
    public class ServiceAccountsClient : IServiceAccountsClient
    {
        private const string SERVICE_ACCOUNTS_ROUTE = "/service-accounts";
        private readonly HttpClient _httpClient;

        public ServiceAccountsClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        
        public async Task<IEnumerable<ServiceAccount>> GetAllAsync()
        {
            var httpResponseMessage = await _httpClient.GetAsync(
                new Uri(SERVICE_ACCOUNTS_ROUTE, UriKind.Relative)
            );
            
            var serviceAccounts = await Utilities.Parse<IEnumerable<ServiceAccount>>(httpResponseMessage);

            return serviceAccounts;
        }

        public async Task<ServiceAccount> CreateAsync(ServiceAccountCreateCommand serviceAccountCreateCommand)
        {
            var payload = JsonConvert.SerializeObject(serviceAccountCreateCommand);

            var content = new StringContent(
                payload,
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync(
                new Uri(SERVICE_ACCOUNTS_ROUTE, UriKind.Relative),
                content
            );

            var serviceAccount = await Utilities.Parse<ServiceAccount>(response);

            return serviceAccount;
        }

        public async Task DeleteAsync(string id)
        {
            var httpResponseMessage = await _httpClient.DeleteAsync(
                new Uri(SERVICE_ACCOUNTS_ROUTE + "/" + id, UriKind.Relative)
            );

            httpResponseMessage.EnsureSuccessStatusCode();
        }
    }
}
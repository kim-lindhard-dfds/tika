using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tika.RestClient.Features.ApiKeys.Models;
using Tika.RestClient.Features.ServiceAccounts.Models;
using Tika.RestClient.IntegrationTests.Features.Factories;
using Xunit;

namespace Tika.RestClient.IntegrationTests.Features.ApiKeys
{
    public class DeleteAnApiKeyScenario
    {
        private IRestClient _client;
        private ApiKeyCreate _apiKeyCreate;
        private ServiceAccountCreate _serviceAccountCreate;
        private ServiceAccount _serviceAccount;
        private ApiKey _apiKey;
        private IEnumerable<ApiKey> _returnedApiKeys;

        [Fact]
        public async Task DeleteApiKeyScenario()
        {
                  Given_a_apiKey_client();
            await And_a_single_apiKey();
            await When_Delete_is_called();
            await And_GetAll_is_called();
                  Then_the_serviceAccount_is_removed();
        }
        
        private void Given_a_apiKey_client()
        {
            _client = LocalhostRestClient.Create();
        }
        
        private async Task And_a_single_apiKey()
        {
            using var client = LocalhostRestClient.Create();
            
            _serviceAccountCreate = new ServiceAccountCreate()
            {
                name = Guid.NewGuid().ToString(), 
                description = "GetAllScenario"
            };
            
            _serviceAccount = await client.ServiceAccounts.CreateAsync(_serviceAccountCreate);

            _apiKeyCreate = new ApiKeyCreate()
            {
                ServiceAccountId = _serviceAccount.Id, 
                Description = "GetAllScenario"
            };

            _apiKey = await client.ApiKeys.CreateAsync(_apiKeyCreate);
        }
        
        private async Task When_Delete_is_called()
        {
            await _client.ApiKeys.DeleteAsync(_apiKey.Key);
        }
        
        private async Task And_GetAll_is_called()
        {
            _returnedApiKeys = await _client.ApiKeys.GetAllAsync();
        }
        
        private void Then_the_serviceAccount_is_removed()
        {
            Assert.Empty(_returnedApiKeys.Where(t => t.Key == _apiKey.Key));
        }
    }
}
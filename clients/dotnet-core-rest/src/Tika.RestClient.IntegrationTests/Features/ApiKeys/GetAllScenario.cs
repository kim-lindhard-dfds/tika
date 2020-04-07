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
    public class GetAllScenario
    {
        private IRestClient _client;
        private ApiKeyCreate _apiKeyCreate;
        private ServiceAccountCreateCommand _serviceAccountCreateCommand;
        private ServiceAccount _serviceAccount;
        private ApiKey _apiKey;
        private IEnumerable<ApiKey> _returnedApiKeys;

        [Fact]
        public async Task GetAllWithSingleApiKeyScenario()
        {
                  Given_a_apiKey_client();
            await And_a_single_apiKey();
            await When_GetAll_is_called();
                  Then_the_apiKey_is_returned();
        }
        
        private void Given_a_apiKey_client()
        {
            _client = LocalhostRestClient.Create();
        }
        
        private async Task And_a_single_apiKey()
        {
            using var client = LocalhostRestClient.Create();
            
            _serviceAccountCreateCommand = ServiceAccountCreateCommandFactory.CreateForIntegrationTest();
            
            _serviceAccount = await client.ServiceAccounts.CreateAsync(_serviceAccountCreateCommand);

            _apiKeyCreate = new ApiKeyCreate()
            {
                ServiceAccountId = _serviceAccount.Id, 
                Description = "GetAllScenario"
            };

            _apiKey = await client.ApiKeys.CreateAsync(_apiKeyCreate);
        }
        
        private async Task When_GetAll_is_called()
        {
            _returnedApiKeys = await _client.ApiKeys.GetAllAsync();
        }
        
        private void Then_the_apiKey_is_returned()
        {
             _returnedApiKeys.Single(t => t.Key == _apiKey.Key);
        }
    }
}
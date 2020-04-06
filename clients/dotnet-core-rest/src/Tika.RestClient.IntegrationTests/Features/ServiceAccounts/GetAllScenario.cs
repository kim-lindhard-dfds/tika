using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tika.RestClient.Features.ServiceAccounts.Models;
using Tika.RestClient.IntegrationTests.Features.Factories;
using Xunit;

namespace Tika.RestClient.IntegrationTests.Features.ServiceAccounts
{
    public class GetAllScenario
    {
        private IRestClient _client;
        private ServiceAccountCreateCommand _serviceAccountCreateCommand;
        private IEnumerable<ServiceAccount> _returnedServiceAccounts;

        [Fact]
        public async Task GetAllWithSingleServiceAccountScenario()
        {
                  Given_a_serviceAccount_client(); 
            await And_a_single_service_account();
            await When_GetAll_is_called();
                  Then_the_serviceAccount_is_returned();
        }
        
        private void Given_a_serviceAccount_client()
        {
            _client = LocalhostRestClient.Create();
        }
        
        private async Task And_a_single_service_account()
        {
            using var client = LocalhostRestClient.Create();
            _serviceAccountCreateCommand = ServiceAccountCreateCommandFactory.CreateForIntegrationTest();
            
            await client.ServiceAccounts.CreateAsync(_serviceAccountCreateCommand);
        }
        
        private async Task When_GetAll_is_called()
        {
            _returnedServiceAccounts = await _client.ServiceAccounts.GetAllAsync();
        }
        
        private void Then_the_serviceAccount_is_returned()
        {
            var serviceAccount = _returnedServiceAccounts.Single(t => t.Name == _serviceAccountCreateCommand.name);
            Assert.Equal(_serviceAccountCreateCommand.description, serviceAccount.Description);
        }
    }
}
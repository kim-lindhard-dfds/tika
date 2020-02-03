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
        private ServiceAccountCreate _serviceAccountCreate;
        private IEnumerable<ServiceAccount> _returnedServiceAccounts;

        [Fact]
        public async Task GetAllWithSingleServiceAccountScenario()
        {
                  Given_a_serviceAccount_client(); 
            await And_a_single_service_account();
            await When_GetAll_is_called();
                  Then_the_serviceAccount_is_returned();
                  And_it_has_the_same_values_as_created_serviceAccount();
        }
        
        private void Given_a_serviceAccount_client()
        {
            _client = LocalhostRestClient.Create();
        }
        
        private async Task And_a_single_service_account()
        {
            using var client = LocalhostRestClient.Create();
            _serviceAccountCreate = new ServiceAccountCreate()
            {
                name = Guid.NewGuid().ToString(), 
                description = "GetAllScenario"
            };
            
            await client.ServiceAccounts.CreateAsync(_serviceAccountCreate);
        }
        
        private async Task When_GetAll_is_called()
        {
            _returnedServiceAccounts = await _client.ServiceAccounts.GetAllAsync();
        }
        
        private void Then_the_serviceAccount_is_returned()
        {
          
        }
        
        private void And_it_has_the_same_values_as_created_serviceAccount()
        {    
            var serviceAccount = _returnedServiceAccounts.Single(t => t.Name == _serviceAccountCreate.name);
            Assert.Equal(_serviceAccountCreate.description, serviceAccount.Description);
        }
    }
}
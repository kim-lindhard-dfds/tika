using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tika.RestClient.Features.ServiceAccounts.Models;
using Tika.RestClient.IntegrationTests.Features.Factories;
using Xunit;

namespace Tika.RestClient.IntegrationTests.Features.ServiceAccounts
{
    public class DeleteAServiceAccountScenario
    {
        private IRestClient _client;
        private ServiceAccountCreateCommand _serviceAccountCreateCommand;
        private ServiceAccount _serviceAccount;
        private IEnumerable<ServiceAccount> _returnedServiceAccounts;

        [Fact]
        public async Task DeleteServiceAccountScenario()
        {
                  Given_a_topic_client();
            await And_a_single_serviceAccount();
            await When_Delete_is_called();
            await And_GetAll_is_called();
                  Then_the_serviceAccount_is_removed();
        }
        
        private void Given_a_topic_client()
        {
            _client = LocalhostRestClient.Create();
        }
        
        private async Task And_a_single_serviceAccount()
        {
            using var client = LocalhostRestClient.Create();
            _serviceAccountCreateCommand = ServiceAccountCreateCommandFactory.CreateForIntegrationTest();
            _serviceAccount = await client.ServiceAccounts.CreateAsync(_serviceAccountCreateCommand);
        }
        
        private async Task When_Delete_is_called()
        {
            await _client.ServiceAccounts.DeleteAsync(_serviceAccount.Id);
        }
        
        private async Task And_GetAll_is_called()
        {
            _returnedServiceAccounts = await _client.ServiceAccounts.GetAllAsync();
        }

        private void Then_the_serviceAccount_is_removed()
        {
            Assert.Empty(_returnedServiceAccounts.Where(t => t.Name == _serviceAccount.Name));
        }
    }
}
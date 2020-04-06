using System;
using Tika.RestClient.Features.ServiceAccounts.Models;

namespace Tika.RestClient.IntegrationTests.Features.Factories
{
    public static class ServiceAccountCreateCommandFactory
    {
        public static ServiceAccountCreateCommand CreateForIntegrationTest()
        {
            return new ServiceAccountCreateCommand
            {
                name = $"integration-test-{Guid.NewGuid().ToString().Substring(0, 5)}",
                description = $"created by integration test at: {DateTime.Now:u}"
            };
        }
    }
}



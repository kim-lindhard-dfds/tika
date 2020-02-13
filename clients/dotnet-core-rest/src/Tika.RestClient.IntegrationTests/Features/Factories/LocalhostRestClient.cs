using System;
using System.Net.Http;
using Tika.RestClient.Factories;

namespace Tika.RestClient.IntegrationTests.Features.Factories
{
    public static class LocalhostRestClient
    {
        public static IRestClient Create()
        {
            var httpClient = new HttpClient {BaseAddress = new Uri("http://localhost:3000/")};

            var restClient = RestClientFactory.Create(httpClient);

            return restClient;
        }
    }
}
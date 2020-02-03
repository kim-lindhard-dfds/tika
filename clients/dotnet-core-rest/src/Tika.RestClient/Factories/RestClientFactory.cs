using System;
using System.Net.Http;
using Microsoft.Extensions.Options;

namespace Tika.RestClient.Factories
{
    public static class RestClientFactory
    {
        public static IRestClient Create(HttpClient httpClient)
        {
            return new Client(httpClient);
        }

        public static IRestClient CreateFromConfiguration(HttpClient httpClient, IOptions<ClientOptions> options)
        {
            httpClient.BaseAddress = new Uri(options.Value?.TIKA_API_ENDPOINT);
            return new Client(httpClient);
        }
    }
}
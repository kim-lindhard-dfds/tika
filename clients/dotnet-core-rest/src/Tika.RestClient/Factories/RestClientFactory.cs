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
            if (options.Value?.TIKA_API_ENDPOINT == null)
            {
                throw new TikaRestClientInvalidConfigurationException("TIKA_API_ENDPOINT");
            }
            httpClient.BaseAddress = new Uri(options.Value?.TIKA_API_ENDPOINT);
            return new Client(httpClient);
        }
    }

    public class TikaRestClientInvalidConfigurationException : Exception
    {
        public TikaRestClientInvalidConfigurationException() : base("RestClientFactory was unable to find the necessary configuration to create a RestClient. Please refer to the configuration section of Tika.RestClient's README.")
        {
            
        }

        public TikaRestClientInvalidConfigurationException(string message) : base($"RestClientFactory was unable to find the necessary configuration for '{message}' to create a RestClient. Please refer to the configuration section of Tika.RestClient's README.")
        {
            
        }
        
        public TikaRestClientInvalidConfigurationException(string message, Exception inner) : base($"RestClientFactory was unable to find the necessary configuration for '{message}' to create a RestClient. Please refer to the configuration section of Tika.RestClient's README.", inner)
        {
            
        }
    }
}

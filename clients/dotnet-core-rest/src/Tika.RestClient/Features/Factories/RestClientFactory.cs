using System.Net.Http;

namespace Tika.RestClient.Features.Factories
{
    public class RestClientFactory
    {
        public static IRestClient Create(HttpClient httpClient)
        {
            return new Client(httpClient);
        }
    }
}
using System.Net.Http;

namespace Tika.RestClient.Factories
{
    public static class RestClientFactory
    {
        public static IRestClient Create(HttpClient httpClient)
        {
            return new Client(httpClient);
        }
    }
}
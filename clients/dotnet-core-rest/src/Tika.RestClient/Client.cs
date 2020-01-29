using System.Net.Http;
using Tika.RestClient.Features.Topics;

namespace Tika.RestClient
{
    internal class Client : IRestClient
    {
        private HttpClient _httpClient;
        public ITopicsClient Topics { get; }
        
        public Client(HttpClient httpClient)
        {
            _httpClient = httpClient;
            Topics = new TopicsClient(httpClient);
        }
        
        public void Dispose()
        {
            _httpClient?.Dispose();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Tika.RestClient.Features.Topics.Models;
using Newtonsoft.Json;

namespace Tika.RestClient.Features.Topics
{
    internal class TopicsClient : ITopicsClient
    {
        private const string TOPICS_ROUTE = "/topics";
        private readonly HttpClient _httpClient;

        public TopicsClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<string>> GetAllAsync()
        {
            var httpResponseMessage = await _httpClient.GetAsync(
                new Uri(TOPICS_ROUTE, UriKind.Relative)
            );
            
            var topics = await Utilities.Parse<IEnumerable<string>>(httpResponseMessage);

            return topics;
        }

        /// <exception cref="Tika.RestClient.Features.Topics.Exceptions.TopicAlreadyExistsException">Thrown when topic with given name already exists</exception>
        public async Task CreateAsync(TopicCreate topicCreate)
        {
            var payload = JsonConvert.SerializeObject(topicCreate);

            var content = new StringContent(
                payload,
                Encoding.UTF8,
                "application/json"
            );

            await _httpClient.PostAsync(
                new Uri(TOPICS_ROUTE, UriKind.Relative),
                content
            );
        }

        public async Task DeleteAsync(string topicName)
        {
            var httpResponseMessage = await _httpClient.DeleteAsync(
                new Uri(TOPICS_ROUTE + "/" + topicName, UriKind.Relative)
            );

            httpResponseMessage.EnsureSuccessStatusCode();
        }
    }
}
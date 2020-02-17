using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Tika.RestClient.Features.Topics.Models;
using Newtonsoft.Json;
using Tika.RestClient.Features.Topics.Exceptions;

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

            var res = await _httpClient.PostAsync(
                new Uri(TOPICS_ROUTE, UriKind.Relative),
                content
            );

            if (res.StatusCode == HttpStatusCode.Conflict)
            {
                var rawText = await res.Content.ReadAsStringAsync();
                var responseData = JsonConvert.DeserializeObject<TikaGenericError>(rawText);
                if (responseData.ErrName == "CcloudTopicAlreadyExists")
                {
                    throw new TopicAlreadyExistsException(responseData.ErrMessage);
                }
            }
        }

        public async Task DeleteAsync(string topicName)
        {
            var httpResponseMessage = await _httpClient.DeleteAsync(
                new Uri(TOPICS_ROUTE + "/" + topicName, UriKind.Relative)
            );

            httpResponseMessage.EnsureSuccessStatusCode();
        }
    }

    internal class TikaGenericError
    {
        public string ErrName { get; set; }
        public string ErrMessage { get; set; }
    }
}
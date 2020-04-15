using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tika.RestClient.Features.Topics.Models;
using Tika.RestClient.IntegrationTests.Features.Factories;
using Xunit;

namespace Tika.RestClient.IntegrationTests.Features.Topics
{
    public class DeleteATopicScenario
    {
        private IRestClient _client;
        private string _topicName;
        private IEnumerable<string> _returnedTopics;

        [Fact]
        public async Task DeleteTopicScenario()
        {
                  Given_a_topic_client();
            await And_a_single_topic();
            await When_Delete_is_called();
            await And_GetAll_is_called();
                  Then_the_topic_is_removed();
        }

        private void Given_a_topic_client()
        {
            _client = LocalhostRestClient.Create();
        }

        private async Task And_a_single_topic()
        {
            using var client = LocalhostRestClient.Create();
            _topicName = Guid.NewGuid().ToString();
            var topicCreate = TopicCreate.Create(
                name: _topicName,
                partitionCount: 1
            );
            
            await client.Topics.CreateAsync(topicCreate);
        }

        private async Task When_Delete_is_called()
        {
            await _client.Topics.DeleteAsync(_topicName);
        }
        private async Task And_GetAll_is_called()
        {
            _returnedTopics = await _client.Topics.GetAllAsync();
        }
        private void Then_the_topic_is_removed()
        {
           Assert.Empty(_returnedTopics.Where(t => t == _topicName));
        }
    }
}
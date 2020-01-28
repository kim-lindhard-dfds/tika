using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tika.RestClient.Features.Topics.Models;
using Tika.RestClient.IntegrationTests.Features.Factories;
using Xunit;

namespace Tika.RestClient.IntegrationTests.Features.Topics
{
    public class GetAllScenario
    {
        private IRestClient _client;
        private TopicCreate _topicCreate;
        private IEnumerable<string> _returnedTopics;

        [Fact]
        public async Task GetAllWIthSingleTopicScenario()
        {
                  Given_a_topic_client();
            await And_a_single_topic();
            await When_GetAll_is_called();
                  Then_the_topic_is_returned();
                  And_it_has_the_same_values_as_created_topic();
        }

      
        private void Given_a_topic_client()
        {
            _client = LocalhostRestClient.Create();
        }

        private async Task And_a_single_topic()
        {
            using var client = LocalhostRestClient.Create();
            _topicCreate = new TopicCreate
            {
                name = Guid.NewGuid().ToString(), 
                partitionCount = 1
            };
            
            await client.Topics.CreateAsync(_topicCreate);
        }

        private async Task When_GetAll_is_called()
        {
            _returnedTopics = await _client.Topics.GetAllAsync();
        }

        private void Then_the_topic_is_returned()
        {
          
        }
        
        private void And_it_has_the_same_values_as_created_topic()
        {    
            _returnedTopics.Single(t => t == _topicCreate.name);
        }

    }
}
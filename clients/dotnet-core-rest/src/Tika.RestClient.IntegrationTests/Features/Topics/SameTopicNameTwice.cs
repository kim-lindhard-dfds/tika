using System;
using System.Threading.Tasks;
using Tika.RestClient.Features.Topics.Exceptions;
using Tika.RestClient.Features.Topics.Models;
using Tika.RestClient.IntegrationTests.Features.Factories;
using Xunit;

namespace Tika.RestClient.IntegrationTests.Features.Topics
{
    public class SameTopicNameTwice : IDisposable
    {
        private IRestClient _client;
        private string _topicName;
        private TopicAlreadyExistsException _topicAlreadyExistsException;

        [Fact]
        public async Task SameTopicNameTwiceScenario()
        {
                  Given_a_topic_client();
            await And_a_single_topic();
            await When_a_topic_with_the_same_name_is_added();
                  Then_a_TopicAlreadyExistsException_is_thrown();
        }

        private void Given_a_topic_client()
        {
            _client = LocalhostRestClient.Create();
        }

        private async Task And_a_single_topic()
        {
            _topicName = "Integration-test-" + Guid.NewGuid();
            var topicCreate = TopicCreate.Create(
                name: _topicName,
                partitionCount: 1
            );

            await _client.Topics.CreateAsync(topicCreate);
        }


        private async Task When_a_topic_with_the_same_name_is_added()
        {
            try
            {
                var topicCreate = TopicCreate.Create(
                    name: _topicName,
                    partitionCount: 1
                );
                
                
                await _client.Topics.CreateAsync(topicCreate);
            }
            catch (TopicAlreadyExistsException e)
            {
                _topicAlreadyExistsException = e;
                Console.WriteLine(e);
            }
        }

        private void Then_a_TopicAlreadyExistsException_is_thrown()
        {
            Assert.NotNull(_topicAlreadyExistsException);
        }

        public void Dispose()
        {
            var task = _client.Topics.DeleteAsync(_topicName);
            task.Wait();
        }
    }
}
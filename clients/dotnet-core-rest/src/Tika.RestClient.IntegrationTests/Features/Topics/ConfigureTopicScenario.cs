using System;
using System.Threading.Tasks;
using Tika.RestClient.Features.Topics.Models;
using Tika.RestClient.IntegrationTests.Features.Factories;
using Xunit;

namespace Tika.RestClient.IntegrationTests.Features.Topics
{
    public class ConfigureTopicScenario : IDisposable
    {
        private IRestClient _client;
        private string _topicName;
        private TimeSpan _messageRetentionPeriod;
        private Int64 _maxDiskUsageInBytes;

        private TopicDescription _returnedTopicDescription;

        [Fact]
        public async Task ConfigureTopicScenarioRecipe()
        {
            Given_a_topic_client();
            await When_creating_a_topic_with_configuration();
            await And_get_description_on_same_topic();
            Then_the_configurations_are_the_same();
        }

        private void Given_a_topic_client()
        {
            _client = LocalhostRestClient.Create();
        }

        private async Task When_creating_a_topic_with_configuration()
        {
            _topicName = "Integration-test-" + Guid.NewGuid();
            var random = new Random();

            _messageRetentionPeriod = TimeSpan.FromDays(random.Next(1, 7));
            _maxDiskUsageInBytes = random.Next(1, 2001) * 1000000;

            var topicCreate = TopicCreate
                    .Create(
                        name: _topicName,
                        partitionCount: 1)
                    .WithConfiguration("retention.ms", _messageRetentionPeriod.TotalMilliseconds)
                    .WithConfiguration("retention.bytes", _maxDiskUsageInBytes);

            await _client.Topics.CreateAsync(topicCreate);
        }

        private async Task And_get_description_on_same_topic()
        {
            _returnedTopicDescription = await _client.Topics.DescribeAsync(_topicName);
        }

        private void Then_the_configurations_are_the_same()
        {
            var returnedMessageRetentionPeriodInMs = (Int64) _returnedTopicDescription.configurations["retention.ms"];
            var returnedMessageRetentionPeriod = TimeSpan.FromMilliseconds(returnedMessageRetentionPeriodInMs);

            var returnedMaxDiskUsageInBytes =
                (Int64) _returnedTopicDescription.configurations["retention.bytes"];

            Assert.Equal(_messageRetentionPeriod, returnedMessageRetentionPeriod);
            Assert.Equal(_maxDiskUsageInBytes, returnedMaxDiskUsageInBytes);
        }

        public void Dispose()
        {
            var task = _client.Topics.DeleteAsync(_topicName);
            task.Wait();
        }
    }
}
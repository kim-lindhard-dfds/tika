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
        private Int64 _maxDiskUsageInMb;

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
            _maxDiskUsageInMb = random.Next(1, 2001);

            var topicCreate = TopicCreate.CreateWithRetention(
                name: _topicName,
                partitionCount: 1,
                messageRetentionPeriod: _messageRetentionPeriod,
                _maxDiskUsageInMb
            );

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
            var returnedMaxDiskUsageInMb = returnedMaxDiskUsageInBytes / 1000000;

            Assert.Equal(_messageRetentionPeriod, returnedMessageRetentionPeriod);
            Assert.Equal(_maxDiskUsageInMb, returnedMaxDiskUsageInMb);
        }

        public void Dispose()
        {
            var task = _client.Topics.DeleteAsync(_topicName);
            task.Wait();
        }
    }
}
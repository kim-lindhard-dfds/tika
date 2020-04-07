using System.Collections.Generic;

namespace Tika.RestClient.Features.Topics.Models
{
    public class TopicCreate
    {
        public string Name { get; set; }
        public int PartitionCount { get; set; }

        public Dictionary<string, object> Configurations { get; set; }


        private TopicCreate()
        {
        }

        public TopicCreate WithConfiguration(string key, object value)
        {
            Configurations.Add(key, value);
            return this;
        }

        public static TopicCreate Create(
            string name,
            int partitionCount
        )
        {
            var topicCrete = new TopicCreate
            {
                Name = name,
                PartitionCount = partitionCount,
                Configurations = new Dictionary<string, object>()
            };

            return topicCrete;
        }
    }
}
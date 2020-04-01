using System;
using System.Collections.Generic;

namespace Tika.RestClient.Features.Topics.Models
{
    public class TopicCreate
    {
        public string name { get; set; }
        public int partitionCount { get; set; }

        public Dictionary<string, object> configurations { get; set; }

        
        private TopicCreate(){}
        
        public static TopicCreate CreateWithDefaultRetention(
            string name,
            int partitionCount
        )
        {
            return CreateWithRetention(
                name: name,
                partitionCount: partitionCount,
                messageRetentionPeriod: TimeSpan.FromDays(7),
                maxDiskUsageInMb: 1000
            );
        }
        
        
        public static TopicCreate CreateWithRetention(
            string name,
            int partitionCount,
            TimeSpan messageRetentionPeriod,
            double maxDiskUsageInMb
        )
        {
            var topicCrete = new TopicCreate
            {
                name = name,
                partitionCount = partitionCount,
                configurations = new Dictionary<string, object>
                {
                    {"retention.ms", messageRetentionPeriod.TotalMilliseconds},
                    {"retention.bytes", maxDiskUsageInMb * 1000000}
                }
            };

            return topicCrete;
        }
        
        public static TopicCreate Create(
            string name,
            int partitionCount
        )
        {
            var topicCrete = new TopicCreate
            {
                name = name,
                partitionCount = partitionCount,
                configurations = new Dictionary<string, object>()
            };

            return topicCrete;
        }

    }
}
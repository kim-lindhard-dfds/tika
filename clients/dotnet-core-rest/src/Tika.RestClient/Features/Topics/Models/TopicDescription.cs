using System.Collections.Generic;

namespace Tika.RestClient.Features.Topics.Models
{
    public class TopicDescription
    {
        public string name { get; set; }
        public int partitionCount { get; set; }

        public Dictionary<string, object> configurations { get; set; }
    }
}
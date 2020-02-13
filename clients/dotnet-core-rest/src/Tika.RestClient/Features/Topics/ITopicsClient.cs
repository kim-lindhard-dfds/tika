using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tika.RestClient.Features.Topics.Models;

namespace Tika.RestClient.Features.Topics
{
    public interface ITopicsClient
    {
        Task<IEnumerable<string>> GetAllAsync();
        Task CreateAsync(TopicCreate topicCreate);
        Task DeleteAsync(string topicName);
    }
}
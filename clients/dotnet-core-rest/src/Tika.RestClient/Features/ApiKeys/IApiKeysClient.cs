using System.Collections.Generic;
using System.Threading.Tasks;
using Tika.RestClient.Features.ApiKeys.Models;

namespace Tika.RestClient.Features.ApiKeys
{
    public interface IApiKeysClient
    {
        Task<IEnumerable<ApiKey>> GetAllAsync();
        Task<ApiKey> CreateAsync(ApiKeyCreate apiKeyCreate);
        Task DeleteAsync(string key);
    }
}
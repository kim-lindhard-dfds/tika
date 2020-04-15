using System.Collections.Generic;
using System.Threading.Tasks;
using Tika.RestClient.Features.ServiceAccounts.Models;

namespace Tika.RestClient.Features.ServiceAccounts
{
    public interface IServiceAccountsClient
    {
        Task<IEnumerable<ServiceAccount>> GetAllAsync();
        Task<ServiceAccount> CreateAsync(ServiceAccountCreateCommand serviceAccountCreateCommand);
        Task DeleteAsync(string id);
    }
}
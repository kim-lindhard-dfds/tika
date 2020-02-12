using System.Collections.Generic;
using System.Threading.Tasks;
using Tika.RestClient.Features.Acls.Models;

namespace Tika.RestClient.Features.Acls
{
    public interface IAclsClient
    {
        Task<IEnumerable<Acl>> GetAllAsync();
        Task CreateAsync(AclCreateDelete aclCreateDelete);
        Task DeleteAsync(AclCreateDelete aclDelete);
    }
}
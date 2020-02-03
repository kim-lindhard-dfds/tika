using System.Collections.Generic;
using System.Threading.Tasks;
using Tika.RestClient.Features.Acls.Models;

namespace Tika.RestClient.Features.Acls
{
    public interface IAclsClient
    {
        Task<IEnumerable<Acl>> GetAllAsync();
        Task<Acl> CreateAsync(Acl aclCreate);
        Task DeleteAsync(Acl aclDelete);
    }
}
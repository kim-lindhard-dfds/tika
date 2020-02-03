using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Tika.RestClient.Features.Acls.Models;

namespace Tika.RestClient.Features.Acls
{
    public class AclsClient : IAclsClient
    {
        private const string ACLS_ROUTE = "/access-control-lists";
        private readonly HttpClient _httpClient;

        public AclsClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        
        public async Task<IEnumerable<Acl>> GetAllAsync()
        {
            var httpResponseMessage = await _httpClient.GetAsync(
                new Uri(ACLS_ROUTE, UriKind.Relative)
            );
            
            var acls = await Utilities.Parse<IEnumerable<Acl>>(httpResponseMessage);

            return acls;
        }

        public async Task<Acl> CreateAsync(Acl aclCreate)
        {
            var payload = JsonConvert.SerializeObject(aclCreate);

            var content = new StringContent(
                payload,
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync(
                new Uri(ACLS_ROUTE, UriKind.Relative),
                content
            );

            var acl = await Utilities.Parse<Acl>(response);

            return acl;
        }

        public async Task DeleteAsync(Acl aclDelete)
        {
            var payload = JsonConvert.SerializeObject(aclDelete);

            var content = new StringContent(
                payload,
                Encoding.UTF8,
                "application/json"
            );

            
            var httpResponseMessage = await _httpClient.PostAsync(
                new Uri(ACLS_ROUTE + "/delete", UriKind.Relative), 
                content
            );

            httpResponseMessage.EnsureSuccessStatusCode();
        }
    }
}
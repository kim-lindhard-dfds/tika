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

        public async Task CreateAsync(AclCreateDelete aclCreateDelete)
        {
            var payload = JsonConvert.SerializeObject(new
            {
                serviceAccountId = aclCreateDelete.ServiceAccountId,
                allow = aclCreateDelete.Allow,
                operation = aclCreateDelete.Operation,
                topicPrefix = aclCreateDelete.TopicPrefix,
                consumerGroupPrefix = aclCreateDelete.ConsumerGroupPrefix
            });

            var content = new StringContent(
                payload,
                Encoding.UTF8,
                "application/json"
            );

            await _httpClient.PostAsync(
                new Uri(ACLS_ROUTE, UriKind.Relative),
                content
            );
        }

        public async Task DeleteAsync(AclCreateDelete aclDelete)
        {
            var payload = JsonConvert.SerializeObject(new
            {
                serviceAccountId = aclDelete.ServiceAccountId,
                allow = aclDelete.Allow,
                operation = aclDelete.Operation,
                topicPrefix = aclDelete.TopicPrefix,
                consumerGroupPrefix = aclDelete.ConsumerGroupPrefix
            });

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
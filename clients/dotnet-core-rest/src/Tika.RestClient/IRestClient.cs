using System;
using Tika.RestClient.Features.Acls;
using Tika.RestClient.Features.ApiKeys;
using Tika.RestClient.Features.ServiceAccounts;
using Tika.RestClient.Features.Topics;

namespace Tika.RestClient
{
    public interface IRestClient : IDisposable
    {
        ITopicsClient Topics { get; }
        IServiceAccountsClient ServiceAccounts { get; }
        IApiKeysClient ApiKeys { get; }
        IAclsClient Acls { get; }
    }
}
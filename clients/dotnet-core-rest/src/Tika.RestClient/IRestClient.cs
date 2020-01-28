using System;
using Tika.RestClient.Features.Topics;

namespace Tika.RestClient
{
    public interface IRestClient : IDisposable
    {
        ITopicsClient Topics { get; }
    }
}
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Tika.RestClient.Factories;

namespace Tika.RestClient
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection AddTikaRestClient(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<ClientOptions>();
            services.AddTransient<IRestClient, Client>(o =>
                {
                    return RestClientFactory.CreateFromConfiguration(new HttpClient(), Options.Create(new ClientOptions(configuration))) as Client;
                });
            return services;
        }
    }

}
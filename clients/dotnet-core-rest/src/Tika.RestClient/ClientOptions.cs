using Microsoft.Extensions.Configuration;

namespace Tika.RestClient
{
    public class ClientOptions
    {
        public string TIKA_API_ENDPOINT { get; set; }
        
        public ClientOptions() {}

        public ClientOptions(IConfiguration conf)
        {
            TIKA_API_ENDPOINT = conf["TIKA_API_ENDPOINT"];
        }
    }
}
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Tika.RestClient
{
    public class Utilities
    {
        public static async Task<T> Parse<T>(HttpResponseMessage response)
        {
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<T>(content);
            return data;
        }
    }
}
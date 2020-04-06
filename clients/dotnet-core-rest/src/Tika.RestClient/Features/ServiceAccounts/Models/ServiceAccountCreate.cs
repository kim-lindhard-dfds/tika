using Tika.RestClient.Features.ServiceAccounts.Exceptions;

namespace Tika.RestClient.Features.ServiceAccounts.Models
{
    public class ServiceAccountCreate
    {
        internal const int MAX_NAME_LENGTH = 32;

        private string _name;
        public string name
        {
            get => _name;
            set
            {
                if (MAX_NAME_LENGTH < value.Length)
                {
                    throw new ServiceAccountNameTooLong(value);
                }

                _name = value;
            }
        }

        public string description { get; set; }
    }
}

using System;

namespace Tika.RestClient.Exceptions
{
    public class AlreadyExistsException  :Exception
    {
        public AlreadyExistsException(string message) : base(message){}
    }
}
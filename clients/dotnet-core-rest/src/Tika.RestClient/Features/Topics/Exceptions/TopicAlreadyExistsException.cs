using Tika.RestClient.Exceptions;

namespace Tika.RestClient.Features.Topics.Exceptions
{
    public class TopicAlreadyExistsException : AlreadyExistsException
    {
        public TopicAlreadyExistsException(string message) : base(message)
        {
        }
    }
}
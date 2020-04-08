using System;
using Tika.RestClient.Features.ServiceAccounts.Models;

namespace Tika.RestClient.Features.ServiceAccounts.Exceptions
{
    public class ServiceAccountNameTooLong : Exception

    {
        public ServiceAccountNameTooLong(string serviceAccountName) : base(
            $"The service account name: '{serviceAccountName}' is {serviceAccountName.Length - ServiceAccountCreateCommand.MAX_NAME_LENGTH} characters longer than the allowed: {ServiceAccountCreateCommand.MAX_NAME_LENGTH} characters"){}
     }
 }
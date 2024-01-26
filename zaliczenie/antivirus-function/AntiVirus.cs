using System;
using System.IO;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class AntiVirus
    {
        [FunctionName("AntiVirus")]
        public async Task Run([BlobTrigger("image/{name}", Connection = "DefaultEndpointsProtocol=https;AccountName=michalexamstorageaccount;AccountKey=gQddSLxztAbBXXx4SZqHpl4YedTAGeLa/Y6t+UO3laM0l2NxRl/CfVGdt2qQxCtYBlFaTNmcyn9m+AStCmIvdA==;EndpointSuffix=core.windows.net")] Stream myBlob, string name, ILogger log)
        {
            Random rnd = new Random();
            if (rnd.Next(2) == 0) 
            {
                string connectionString = Environment.GetEnvironmentVariable("AzureWebJobsStorage");
                string containerName = "images"; 

                BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
                BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);
                BlobClient blobClient = containerClient.GetBlobClient(name);

                await blobClient.DeleteIfExistsAsync();
            }
        }

    }
}

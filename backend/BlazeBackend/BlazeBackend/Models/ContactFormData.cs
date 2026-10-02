
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BlazeBackend.Models
{

    public class ContactFormData
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Message { get; set; }

        // Honeypot
        public string? ContactReferenceCode { get; set; }

        [JsonExtensionData]
        public Dictionary<string, JsonElement>? AdditionalFields { get; set; }
    }
}

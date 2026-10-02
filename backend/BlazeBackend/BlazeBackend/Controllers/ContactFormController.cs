using System.Net.Mail;
using BlazeBackend.Models;
using Microsoft.AspNetCore.Mvc;

namespace BlazeBackend.Controllers;

[ApiController]
[Route("api/contactform")]
public class ContactFormController : ControllerBase
{
    private const int MaxNameLength = 100;
    private const int MaxEmailLength = 254;
    private const int MaxMessageLength = 5000;

    [HttpPost]
    public IActionResult SubmitContactForm([FromBody] ContactFormData? postData)
    {
        if (postData is not null)
        {
            NormalizeFormData(postData);
        }

        var validationResult = ValidateFormData(postData);

        if (!validationResult.IsValid)
        {
            return BadRequest(new
            {
                error = validationResult.ErrorMessage
            });
        }

        // Send email through SES.

        return Ok(new
        {
            message = "Email sent successfully."
        });
    }

    private static ValidationResult ValidateFormData(ContactFormData? postData)
    {
        if (postData is null)
        {
            return ValidationResult.Invalid("Invalid request.");
        }

        // Do not reveal spam-detection details.
        if (!string.IsNullOrWhiteSpace(postData.Website) ||
            postData.AdditionalFields is { Count: > 0 })
        {
            return ValidationResult.Invalid("Invalid contact form data.");
        }

        if (string.IsNullOrWhiteSpace(postData.Name))
        {
            return ValidationResult.Invalid("Name is required.");
        }

        if (postData.Name.Length > MaxNameLength)
        {
            return ValidationResult.Invalid(
                $"Name must be {MaxNameLength} characters or fewer.");
        }

        if (string.IsNullOrWhiteSpace(postData.Email))
        {
            return ValidationResult.Invalid("Email is required.");
        }

        if (postData.Email.Length > MaxEmailLength)
        {
            return ValidationResult.Invalid(
                $"Email must be {MaxEmailLength} characters or fewer.");
        }

        if (!IsValidEmail(postData.Email))
        {
            return ValidationResult.Invalid("Please enter a valid email address.");
        }

        if (string.IsNullOrWhiteSpace(postData.Message))
        {
            return ValidationResult.Invalid("Message is required.");
        }

        if (postData.Message.Length > MaxMessageLength)
        {
            return ValidationResult.Invalid(
                $"Message must be {MaxMessageLength} characters or fewer.");
        }

        return ValidationResult.Valid();
    }

    private sealed record ValidationResult(bool IsValid, string? ErrorMessage)
    {
        public static ValidationResult Valid()
            => new(true, null);

        public static ValidationResult Invalid(string message)
            => new(false, message);
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            var address = new MailAddress(email);

            return address.Address == email;
        }
        catch (FormatException)
        {
            return false;
        }
    }

    private static void NormalizeFormData(ContactFormData postData)
    {
        postData.Name = postData.Name?.Trim();
        postData.Email = postData.Email?.Trim();
        postData.Message = postData.Message?.Trim();
    }

}
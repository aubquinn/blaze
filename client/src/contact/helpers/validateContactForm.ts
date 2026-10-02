import { characterCount } from "@astryxdesign/core/utils";

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

export type ContactFormValidation = {
  errors: ContactFormErrors;
  isValid: boolean;
};

export const contactFieldMaxLengths = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

// Match the HTML email-input syntax so the form and submit action agree.
// https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const contactFieldValidators: Record<
  keyof ContactFormValues,
  (value: string) => string | undefined
> = {
  name: (value) => {
    if (value.trim().length === 0) {
      return "Name is required.";
    }
    return value.length > contactFieldMaxLengths.name
      ? `Name must be ${contactFieldMaxLengths.name} characters or fewer.`
      : undefined;
  },
  email: (value) => {
    if (value.length > contactFieldMaxLengths.email) {
      return `Email must be ${contactFieldMaxLengths.email} characters or fewer.`;
    }
    return !emailPattern.test(value.trim())
      ? "Enter a valid email address."
      : undefined;
  },
  message: (value) => {
    if (value.trim().length === 0) {
      return "Message is required.";
    }
    return characterCount(value) > contactFieldMaxLengths.message
      ? `Message must be ${contactFieldMaxLengths.message} characters or fewer.`
      : undefined;
  },
};

export function validateContactForm(
  values: ContactFormValues,
): ContactFormValidation {
  const errors: ContactFormErrors = {};
  for (const field of ["name", "email", "message"] as const) {
    const error = contactFieldValidators[field](values[field]);
    if (error) {
      errors[field] = error;
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

// Match the HTML email-input syntax so the form and submit action agree.
// https://html.spec.whatwg.org/multipage/input.html#email-state-(type=email)
const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const contactFieldValidators: Record<
  keyof ContactFormValues,
  (value: string) => string | undefined
> = {
  name: (value) => (value.trim().length === 0 ? "Name is required." : undefined),
  email: (value) =>
    !emailPattern.test(value.trim())
      ? "Enter a valid email address."
      : undefined,
  message: (value) =>
    value.trim().length === 0 ? "Message is required." : undefined,
};

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  for (const field of ["name", "email", "message"] as const) {
    const error = contactFieldValidators[field](values[field]);
    if (error) {
      errors[field] = error;
    }
  }
  return errors;
}

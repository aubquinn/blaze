"use server";

import {
  validateContactForm,
  type ContactFormErrors,
} from "./validateContactForm";

export type ContactFormState =
  | { status: "idle" | "success" }
  | { status: "invalid"; errors: ContactFormErrors }
  | { status: "error"; message: string };

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const validation = validateContactForm(
    values,
    String(formData.get("website") ?? ""),
  );
  if (validation.isHoneypotFilled) {
    return { status: "success" };
  }
  if (!validation.isValid) {
    return { status: "invalid", errors: validation.errors };
  }

  // TODO: Replace this simulated request with an HTTP POST of values.
  await new Promise<void>((resolve) => setTimeout(resolve, 750));

  return { status: "success" };
}

"use client";

import {
  validateContactForm,
  type ContactFormErrors,
} from "./validateContactForm";
import { sanitizeContactText } from "./sanitizeContactText";

export type ContactFormState =
  | { status: "idle" | "success" }
  | { status: "invalid"; errors: ContactFormErrors }
  | { status: "error"; message: string };

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: sanitizeContactText(formData.get("name")),
    email: sanitizeContactText(formData.get("email")),
    message: sanitizeContactText(formData.get("message")),
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

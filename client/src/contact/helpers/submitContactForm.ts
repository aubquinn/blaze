"use client";

import {
  validateContactForm,
  type ContactFormErrors,
} from "./validateContactForm";
import { sanitizeContactText } from "./sanitizeContactText";

export type ContactFormState =
  | { status: "idle" | "success" }
  | { status: "invalid"; errors: ContactFormErrors }
  | { status: "error" };

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: sanitizeContactText(formData.get("name")),
    email: sanitizeContactText(formData.get("email")),
    message: sanitizeContactText(formData.get("message")),
  };
  const validation = validateContactForm(values);
  if (!validation.isValid) {
    return { status: "invalid", errors: validation.errors };
  }

  try {
    const response = await fetch("/api/contactform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        message: values.message,
      }),
    });

    if (!response.ok) {
      return { status: "error" };
    }
  } catch {
    return { status: "error" };
  }
  return { status: "success" };
}

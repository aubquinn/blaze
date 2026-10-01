export type ContactFormState =
  | { status: "idle" | "success" }
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

  if (!values.name || !values.email || !values.message) {
    return {
      status: "error",
      message: "Please fill in your name, email address, and message.",
    };
  }

  // TODO: Replace this simulated request with an HTTP POST of values.
  await new Promise<void>((resolve) => setTimeout(resolve, 750));

  return { status: "success" };
}

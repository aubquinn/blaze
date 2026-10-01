import sanitizeHtml from "sanitize-html";

export function sanitizeContactText(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") {
    return "";
  }

  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
}

import { describe, expect, it } from "vitest";
import { submitContactForm } from "./submitContactForm";
import { validateContactForm } from "./validateContactForm";

const validValues = {
  name: "Alice",
  email: "alice@example.com",
  message: "Please contact me",
};

describe("contact form validation", () => {
  it.each(["", "    ", "Jane", "  Jane  "])(
    "rejects a name shorter than five characters after trimming: %j",
    (name) => {
      expect(validateContactForm({ ...validValues, name }).name).toBeDefined();
    },
  );

  it.each(["Alice", "  Alice  ", "Renée", "O'Neil"])(
    "accepts a name with at least five characters: %j",
    (name) => {
      expect(validateContactForm({ ...validValues, name })).toEqual({});
    },
  );

  it.each([
    "",
    "alice",
    "alice@",
    "@example.com",
    "alice smith@example.com",
    "alice@@example.com",
    "alice@example..com",
    "alice@-example.com",
    "alice@example-.com",
    "alice@example.com,other@example.com",
  ])("rejects a malformed email: %j", (email) => {
    expect(validateContactForm({ ...validValues, email }).email).toBeDefined();
  });

  it.each([
    "alice@example.com",
    "alice+contact@mail.example.co.uk",
    "  alice@example.com  ",
  ])("accepts a valid email: %j", (email) => {
    expect(validateContactForm({ ...validValues, email })).toEqual({});
  });

  it.each(["", "   ", "... ! ?", "Hello", "Please help", "Please help !!!"])(
    "rejects a message with fewer than three words: %j",
    (message) => {
      expect(validateContactForm({ ...validValues, message }).message).toBeDefined();
    },
  );

  it.each([
    "Please contact me",
    "Please contact me.",
    "Please\ncontact\tme",
    "I'd appreciate help",
    "Please contact me. I have a question.",
  ])("accepts messages with or without sentence punctuation: %j", (message) => {
    expect(validateContactForm({ ...validValues, message })).toEqual({});
  });
});

describe("contact form submission validation", () => {
  it.each([
    ["name", "Jane"],
    ["email", "invalid-email"],
    ["message", "Please help"],
  ] as const)("rejects an invalid %s even when bypassing the UI", async (field, value) => {
    const formData = new FormData();
    for (const [key, fieldValue] of Object.entries({ ...validValues, [field]: value })) {
      formData.set(key, fieldValue);
    }

    const result = await submitContactForm({ status: "idle" }, formData);

    expect(result).toMatchObject({
      status: "invalid",
      errors: { [field]: expect.any(String) },
    });
  });
});

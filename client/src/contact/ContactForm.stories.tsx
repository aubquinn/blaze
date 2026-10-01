import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { ContactForm } from "./ContactForm";

const meta = {
  component: ContactForm,
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Validation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByRole("textbox", { name: "Full Name" });
    const email = canvas.getByRole("textbox", { name: "Email Address" });
    const message = canvas.getByRole("textbox", { name: "Message" });
    const submit = canvas.getByRole("button", { name: "Submit" });

    await expect(name).not.toHaveAttribute("aria-invalid", "true");
    await expect(email).not.toHaveAttribute("aria-invalid", "true");
    await expect(message).not.toHaveAttribute("aria-invalid", "true");
    await userEvent.click(name);
    await userEvent.tab();
    await expect(name).not.toHaveAttribute("aria-invalid", "true");

    await userEvent.type(name, "   ");
    await expect(name).toHaveFocus();
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText("Name is required.")).toBeVisible();
    const nameError = canvas.getByText("Name is required.");

    await userEvent.type(email, "invalid-email");
    await expect(nameError).toBeVisible();
    await expect(canvas.getByText("Name is required.")).toBe(nameError);
    await expect(email).toHaveFocus();
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(
      canvas.getByText("Enter a valid email address."),
    ).toBeVisible();
    const emailError = canvas.getByText("Enter a valid email address.");

    await userEvent.type(message, "   ");
    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(canvas.getByText("Enter a valid email address.")).toBe(
      emailError,
    );
    await expect(message).toHaveFocus();
    await expect(message).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText("Message is required.")).toBeVisible();
    const messageError = canvas.getByText("Message is required.");
    await expect(submit).toHaveAttribute("aria-disabled", "true");

    await userEvent.type(name, "A");
    await expect(emailError).toBeVisible();
    await expect(messageError).toBeVisible();
    await expect(canvas.getByText("Message is required.")).toBe(messageError);
    await expect(name).not.toHaveAttribute("aria-invalid", "true");
    await userEvent.clear(email);
    await userEvent.type(email, "jane@example.com");
    await expect(email).not.toHaveAttribute("aria-invalid", "true");
    await expect(submit).toHaveAttribute("aria-disabled", "true");
    await userEvent.type(message, "Hi");
    await expect(message).not.toHaveAttribute("aria-invalid", "true");
    await expect(submit).not.toHaveAttribute("aria-disabled", "true");

    await userEvent.clear(name);
    await expect(submit).toHaveAttribute("aria-disabled", "true");
    await expect(name).toHaveAttribute("aria-invalid", "true");

    await userEvent.type(name, "L");
    await userEvent.type(name, "i");
    await expect(name).not.toHaveAttribute("aria-invalid", "true");
    await expect(submit).not.toHaveAttribute("aria-disabled", "true");
    await expect(name).not.toHaveAttribute("aria-invalid", "true");
  },
};

export const IndependentValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByRole("textbox", { name: "Full Name" });
    const email = canvas.getByRole("textbox", { name: "Email Address" });
    const slowTyping = userEvent.setup({ delay: 75 });

    await userEvent.type(name, "   ");
    // An error in one field stays visible while another field changes.
    await slowTyping.type(email, "invalid-email");
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText("Name is required.")).toBeVisible();
    await expect(email).toHaveAttribute("aria-invalid", "true");
    await expect(
      canvas.getByText("Enter a valid email address."),
    ).toBeVisible();
    await expect(name).toHaveAttribute("aria-invalid", "true");
  },
};

export const Submission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByRole("textbox", { name: /Full Name/ });
    const email = canvas.getByRole("textbox", { name: /Email Address/ });
    const message = canvas.getByRole("textbox", { name: /Message/ });
    const submit = canvas.getByRole("button", { name: "Submit" });

    await expect(submit).toHaveAttribute("aria-disabled", "true");
    await userEvent.type(name, "Li");
    await userEvent.type(email, "jane@example.com");
    await userEvent.type(message, "   ");
    await expect(submit).toHaveAttribute("aria-disabled", "true");
    await userEvent.clear(message);
    await userEvent.type(message, "Hi");
    await expect(submit).not.toHaveAttribute("aria-disabled", "true");

    await userEvent.click(submit);
    await expect(submit).toBeVisible();
    await expect(submit).toHaveAttribute("aria-busy", "true");
    await expect(submit).toHaveAttribute("aria-disabled", "true");
    await expect(within(submit).getByRole("status")).toHaveTextContent(
      /Loading/,
    );
    await expect(name).toBeVisible();
    await expect(name).toBeDisabled();
    await expect(name).toHaveValue("Li");
    await expect(email).toBeVisible();
    await expect(email).toBeDisabled();
    await expect(email).toHaveValue("jane@example.com");
    await expect(message).toBeVisible();
    await expect(message).toBeDisabled();
    await expect(message).toHaveValue("Hi");

    await waitFor(async () => {
      await expect(
        canvas.getByRole("heading", { name: "Thank you!" }),
      ).toBeVisible();
    });
    await expect(
      canvas.getByText("I'll be in touch as soon as I can."),
    ).toBeVisible();
    await expect(canvas.queryByRole("textbox")).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole("button", { name: /Submit/ }),
    ).not.toBeInTheDocument();
  },
};

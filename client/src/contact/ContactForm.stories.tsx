import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { ContactForm } from './ContactForm';

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
    const name = canvas.getByRole('textbox', { name: 'Full Name' });
    const email = canvas.getByRole('textbox', { name: 'Email Address' });
    const message = canvas.getByRole('textbox', { name: 'Message' });
    const submit = canvas.getByRole('button', { name: 'Submit' });

    await expect(name).not.toHaveAttribute('aria-invalid', 'true');
    await expect(email).not.toHaveAttribute('aria-invalid', 'true');
    await expect(message).not.toHaveAttribute('aria-invalid', 'true');
    await userEvent.click(name);
    await userEvent.tab();
    await expect(name).not.toHaveAttribute('aria-invalid', 'true');

    await userEvent.type(name, 'Jane');
    await expect(name).toHaveFocus();
    await expect(name).not.toHaveAttribute('aria-invalid', 'true');
    await waitFor(async () => {
      await expect(name).toHaveAttribute('aria-invalid', 'true');
      await expect(
        canvas.getByText('Enter a name with at least 5 characters.'),
      ).toBeVisible();
    });
    const nameError = canvas.getByText('Enter a name with at least 5 characters.');

    await userEvent.type(email, 'invalid-email');
    await expect(nameError).toBeVisible();
    await expect(
      canvas.getByText('Enter a name with at least 5 characters.'),
    ).toBe(nameError);
    await expect(email).toHaveFocus();
    await expect(email).not.toHaveAttribute('aria-invalid', 'true');
    await waitFor(async () => {
      await expect(email).toHaveAttribute('aria-invalid', 'true');
      await expect(canvas.getByText('Enter a valid email address.')).toBeVisible();
    });
    const emailError = canvas.getByText('Enter a valid email address.');

    await userEvent.type(message, 'Please help');
    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(canvas.getByText('Enter a valid email address.')).toBe(emailError);
    await expect(message).toHaveFocus();
    await expect(message).not.toHaveAttribute('aria-invalid', 'true');
    await waitFor(async () => {
      await expect(message).toHaveAttribute('aria-invalid', 'true');
      await expect(
        canvas.getByText('Write a message with at least 3 words.'),
      ).toBeVisible();
    });
    const messageError = canvas.getByText('Write a message with at least 3 words.');
    await expect(submit).toBeDisabled();

    await userEvent.type(name, ' Doe');
    await expect(emailError).toBeVisible();
    await expect(messageError).toBeVisible();
    await expect(
      canvas.getByText('Write a message with at least 3 words.'),
    ).toBe(messageError);
    await expect(name).not.toHaveAttribute('aria-invalid', 'true');
    await userEvent.clear(email);
    await userEvent.type(email, 'jane@example.com');
    await expect(email).not.toHaveAttribute('aria-invalid', 'true');
    await expect(submit).toBeDisabled();
    await userEvent.type(message, ' me');
    await expect(message).not.toHaveAttribute('aria-invalid', 'true');
    await expect(submit).toBeDisabled();
    await waitFor(async () => {
      await expect(submit).toBeEnabled();
    });

    await userEvent.clear(name);
    await expect(submit).toBeDisabled();
    await expect(name).not.toHaveAttribute('aria-invalid', 'true');
    await waitFor(async () => {
      await expect(name).toHaveAttribute('aria-invalid', 'true');
    });

    await userEvent.type(name, 'Jane');
    await userEvent.type(name, ' Doe');
    await expect(name).not.toHaveAttribute('aria-invalid', 'true');
    await expect(submit).toBeDisabled();
    await waitFor(async () => {
      await expect(submit).toBeEnabled();
    });
    await expect(name).not.toHaveAttribute('aria-invalid', 'true');
  },
};

export const IndependentValidation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByRole('textbox', { name: 'Full Name' });
    const email = canvas.getByRole('textbox', { name: 'Email Address' });
    const slowTyping = userEvent.setup({ delay: 75 });

    await userEvent.type(name, 'Jane');
    // Name validation must finish while typing continues in the email field.
    await slowTyping.type(email, 'invalid-email');
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(
      canvas.getByText('Enter a name with at least 5 characters.'),
    ).toBeVisible();
    await expect(email).not.toHaveAttribute('aria-invalid', 'true');

    await waitFor(async () => {
      await expect(email).toHaveAttribute('aria-invalid', 'true');
      await expect(canvas.getByText('Enter a valid email address.')).toBeVisible();
    });
    await expect(name).toHaveAttribute('aria-invalid', 'true');
  },
};

export const Submission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const name = canvas.getByRole('textbox', { name: /Full Name/ });
    const email = canvas.getByRole('textbox', { name: /Email Address/ });
    const message = canvas.getByRole('textbox', { name: /Message/ });
    const submit = canvas.getByRole('button', { name: 'Submit' });

    await expect(submit).toBeDisabled();
    await userEvent.type(name, 'Jane Doe');
    await userEvent.type(email, 'jane@example.com');
    await userEvent.type(message, '   ');
    await expect(submit).toBeDisabled();
    await userEvent.clear(message);
    await userEvent.type(message, 'Hello, I would like to get in touch');
    await waitFor(async () => {
      await expect(submit).toBeEnabled();
    });

    await userEvent.click(submit);
    await expect(submit).toBeVisible();
    await expect(submit).toHaveAttribute('aria-busy', 'true');
    await expect(submit).toBeDisabled();
    await expect(within(submit).getByRole('status')).toHaveTextContent(/Loading/);
    await expect(name).toBeVisible();
    await expect(name).toBeDisabled();
    await expect(name).toHaveValue('Jane Doe');
    await expect(email).toBeVisible();
    await expect(email).toBeDisabled();
    await expect(email).toHaveValue('jane@example.com');
    await expect(message).toBeVisible();
    await expect(message).toBeDisabled();
    await expect(message).toHaveValue('Hello, I would like to get in touch');

    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: 'Thank you!' }),
      ).toBeVisible();
    });
    await expect(
      canvas.getByText("I'll be in touch as soon as I can."),
    ).toBeVisible();
    await expect(canvas.queryByRole('textbox')).not.toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: /Submit/ })).not.toBeInTheDocument();
  },
};

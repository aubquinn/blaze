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
    await userEvent.type(message, 'Hello, I would like to get in touch.');
    await expect(submit).toBeEnabled();

    await userEvent.click(submit);
    await expect(
      await canvas.findByRole('status', { name: 'Sending your message...' }),
    ).toBeVisible();
    await expect(submit).toBeDisabled();
    await expect(name).toBeDisabled();
    await expect(email).toBeDisabled();
    await expect(message).toBeDisabled();

    await waitFor(async () => {
      await expect(
        canvas.getByRole('heading', { name: 'Thank you!' }),
      ).toBeVisible();
    });
    await expect(
      canvas.getByText("I'll be in touch as soon as I can."),
    ).toBeVisible();
    await expect(canvas.queryByRole('textbox')).not.toBeInTheDocument();
    await expect(
      canvas.queryByRole('status', { name: 'Sending your message...' }),
    ).not.toBeInTheDocument();
  },
};

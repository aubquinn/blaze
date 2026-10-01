import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ContactError } from "./ContactError";

const meta = {
  title: "Contact Error",
  component: ContactError,
} satisfies Meta<typeof ContactError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

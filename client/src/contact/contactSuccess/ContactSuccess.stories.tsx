import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ContactSuccess } from "./ContactSuccess";

const meta = {
  title: "Contact Success",
  component: ContactSuccess,
} satisfies Meta<typeof ContactSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

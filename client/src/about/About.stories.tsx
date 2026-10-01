import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { About } from "./About";

const meta = {
  title: "About",
  component: About,
} satisfies Meta<typeof About>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

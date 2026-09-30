import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Writing } from "./Writing";

const meta = {
  component: Writing,
} satisfies Meta<typeof Writing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

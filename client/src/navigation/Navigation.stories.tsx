import type { Meta, StoryObj } from "@storybook/react-vite";

import { Navigation } from "./Navigation";

const meta = {
  component: Navigation,
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const Horizontal: Story = {
  args: { layout: "top" },
};

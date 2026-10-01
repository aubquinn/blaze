import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Experiments } from "./Experiments";

const meta = {
  title: "Experiments",
  component: Experiments,
} satisfies Meta<typeof Experiments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

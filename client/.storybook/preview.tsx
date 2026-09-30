import type { Preview } from '@storybook/nextjs-vite'

import { Providers } from "../src/shared/Providers";

import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
    decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
};

export default preview;

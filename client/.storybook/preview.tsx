import type { Preview } from '@storybook/react-vite'

import { Theme } from "@astryxdesign/core/theme";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";

import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
    decorators: [
    (Story) => (
      <Theme theme={neutralTheme} mode="system">
        <Story />
      </Theme>
    ),
  ],
};

export default preview;

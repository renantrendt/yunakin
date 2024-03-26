import type { Preview } from "@storybook/react";
import '../src/app/globals.css';
import { withThemeByDataAttribute } from '@storybook/addon-styling';

export const decorators = [
  withThemeByDataAttribute({
    themes: {
      Light: 'light',
      Dark: 'dark',
    },
    defaultTheme: 'light',
    attributeName: 'data-mode',
  }),
]
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

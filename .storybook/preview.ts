import type { Preview } from "@storybook/react";
import '../src/app/globals.css';
import { withThemeByClassName } from "@storybook/addon-themes";
import { withThemeByDataAttribute } from '@storybook/addon-themes';

export const decorators = [
  withThemeByClassName({
    themes: {
      Light: 'light',
      Dark: 'dark',
    },
    defaultTheme: 'light',
  }),
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

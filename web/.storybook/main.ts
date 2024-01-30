import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
    ({
      name: "@storybook/addon-styling-webpack",

      options: {
        rules: [{
          test: /\.css$/,
          sideEffects: true,
          use: [
            require.resolve("style-loader"),
            {
              loader: require.resolve("css-loader"),
              options: {

                importLoaders: 1,
              },
            }, {
              loader: require.resolve("postcss-loader"),
              options: {
                implementation: require.resolve("postcss"),
              },
            },
          ],
        },],
      }
    }),
    "@storybook/addon-themes"
  ],
  webpackFinal(config, options) {
    (config.resolve as any).alias = {
      ...(config.resolve as any).alias,
      '@': path.resolve(__dirname, "../src/"),
    };
    return config;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;

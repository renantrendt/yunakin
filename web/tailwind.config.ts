import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",

      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",

          }
        }
      },
      colors: {
        'primary': '#8E76FE',
        'primary-end': '#8C5AFC',
        'stone-950': "#0F0F0F",
        'neutral-600': "#4B4B4B",
        'neutral-200': "#DEDEDE",
        'header-color': '#91A0B5',
        'landing-background': "#FAFAFA"
      }
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography'), addVariablesForColors],
  daisyui: {
    themes: [{
      light: {
        primary: "#8E76FE",
        secondary: "#3E21EB",
        danger: "#eeeeee",
        transparent: "transparent",
      }
    }, {
      dark: {
        primary: "#8E76FE",
        secondary: "#3E21EB",
        danger: "#eeeeee",
        transparent: "transparent",
      }
    }],

  }
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
export default config

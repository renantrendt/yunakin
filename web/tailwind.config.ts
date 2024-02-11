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
          "infinite-scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "meteor-effect": "meteor 5s linear infinite"
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      fontSize: {
        '5xl': '48px',
        '4xl': "36px",
        "3xl": "30px",
        "2xl": "24px",
        "xl": "20px",
        "lg": "18px",
        "md": "16px",
        "sm": "14px",
        "xs": "12px",
        "paragraph": "14px"
      },
      lineHeight: {
        '5xl': '48px',
        '4xl': "40px",
        "3xl": "36px",
        "2xl": "32px",
        "xl": "28px",
        "lg": "28px",
        "md": "24px",
        "sm": "20px",
        "xs": "16px",
        "paragraph": "24px"
      },
      fontWeight: {
        'regular': "400",
        'medium': "500",
        'semibold': "600",
      }

    },
    colors: {
      // 'primary': '#8E76FE',
      'primary-end': '#8C5AFC',
      'stone-950': "#0F0F0F",
      'neutral-600': "#4B4B4B",
      'neutral-200': "#DEDEDE",
      'header-color': '#91A0B5',
      'landing-background': "#FAFAFA",
      'category-blog-color': "#515151",
      'category-blog-background': "#EBEBEB",
      'category-card-autor': "#8B8B8B",
      'white': "#FFFFFF",
      'black': "# ",
      'grey-50': "#FBFBFB",
      'grey-100': "#F5F5F5",
      'grey-200': "#ECECEC",
      'grey-300': "#DBDBDB",
      'primary': {
        500: '#996cff',
      },
    }
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography'), addVariablesForColors],
  daisyui: {
    themes: [{
      light: {
        primary: "#996cff",
        secondary: "#3E21EB",
        danger: "#eeeeee",
        transparent: "transparent",
      }
    }, {
      dark: {
        primary: "#996cff",
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

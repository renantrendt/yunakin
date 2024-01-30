import type { Config } from 'tailwindcss'

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
      colors: {
        'primary': '#1F76EB',
        'stone-950': "#0F0F0F",
        'neutral-600': "#4B4B4B",
        'neutral-200': "#DEDEDE",
        'landing-background': "#FAFAFA"
      }
    },
  },
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
  daisyui: {
    themes: [{
      light: {
        primary: "#1F76EB",
        secondary: "#3E21EB",
        danger: "#eeeeee",
        transparent: "transparent",
      }
    }, {
      dark: {
        primary: "#1F76EB",
        secondary: "#3E21EB",
        danger: "#eeeeee",
        transparent: "transparent",
      }
    }],

  }
}
export default config

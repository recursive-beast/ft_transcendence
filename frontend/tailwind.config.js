/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        'video-portrait': '9 / 16',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        team: "width opacity",
      },
      screens: {
        touch: {
          raw: "(hover: none) and (pointer: coarse)",
        },
      },
    },
    screens: {
      'xs': '380px',
      ...defaultTheme.screens,
      'md': '769px',
      'sm-h': { 'raw': '(min-height: 900px)' },
      'md-h': { 'raw': '(min-height: 1200px)' },
    },
    colors: {
      // Primary colors
      pr01: "#EB5A3A",
      pr02: "#EE7458",
      pr03: "#F2937D",

      // Background colors
      bg01: "#0D0D0D",
      bg02: "#1E1E1E",
      bg03: "#262522",

      // Text colors
      tx01: "#B7AB98",
      tx02: "#625D53",
      tx03: "#2E2C29",
      tx04: "#0D0D0D",
      tx05: "#FFFFFF",
      tx06: "#EB5A3A",
    },
  },
  plugins: [require('tailwind-children')],
};

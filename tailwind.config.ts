import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors reflecting the logo's green
        primary: {
          DEFAULT: '#008000', // Logo green
          foreground: '#ffffff', // White text for contrast
        },
        // Background and Foreground
        background: '#000000', // Black background as in the logo
        foreground: '#ffffff', // White text for readability
        // Accent Colors
        accent: {
          DEFAULT: '#00b050', // Lighter green for accents
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#666666', // Neutral muted gray for borders or subtle text
          foreground: '#cccccc', // Light gray for secondary text
        },
        destructive: {
          DEFAULT: '#ff0000', // Red for destructive actions (e.g., delete buttons)
          foreground: '#ffffff',
        },
        border: '#444444', // Dark gray for borders to match a modern theme
        input: '#333333', // Dark input background with white text
        ring: '#008000', // Green focus ring for accessibility
        card: {
          DEFAULT: '#ffffff', // White card background
          foreground: '#000000', // Black text for contrast
        },
        popover: {
          DEFAULT: '#ffffff', // White background for popovers
          foreground: '#000000', // Black text
        },
      },
      borderRadius: {
        lg: '12px', // Larger rounded corners for a modern design
        md: '8px',
        sm: '4px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

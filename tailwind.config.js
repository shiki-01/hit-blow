import flowbitePlugin from 'flowbite/plugin'
import { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,css,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#f0f9ff',
          200: '#e0f2fe',
          300: '#bae6fd',
          400: '#7dd3fc',
          500: '#38bdf8',
          600: '#0ea5e9',
          700: '#0284c7',
          800: '#0369a1',
          900: '#075985',
        },
      },
    },
  },
  plugins: [
    flowbitePlugin,
  ],
}


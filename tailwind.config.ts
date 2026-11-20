import type { Config } from 'tailwindcss';
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)', card: 'var(--card)', fg: 'var(--fg)', muted: 'var(--muted)', line: 'var(--line)',
        secondary: 'var(--secondary)', danger: 'var(--danger)',
        primary: { DEFAULT: 'var(--primary)', fg: 'var(--primary-fg)' },
      },
    },
  },
  plugins: [],
};
export default config;

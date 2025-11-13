import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // design tokens mapped to CSS variables so classes like `bg-background` work
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        border: 'var(--border)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        olive: 'var(--olive)',
      },
    },
  },
  plugins: [],
} satisfies Config

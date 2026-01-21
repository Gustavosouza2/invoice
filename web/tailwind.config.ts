module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        'md-tablet': '1024px',
        // => @media (min-width: 1024px) { ... }

        'md-mobile': '1300px',
        // => @media (min-width: 1380px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        custom: '1200px',
        // => @media (min-width: 1200px) { ... }
      },
      fontSize: {
        'modal-title': ['1.85rem', { lineHeight: '2.2rem', fontWeight: '700' }],
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        inter: ['var(--font-inter)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },

        // Surface colors - for component backgrounds (inputs, buttons, cards)
        surface: {
          DEFAULT: '#2A2A2E',
          elevated: '#1F1F23',
          hover: '#333337',
        },

        // Background colors - for page/container backgrounds
        bg: {
          DEFAULT: '#1A1A1D',
          primary: '#151518',
          secondary: '#E1C379',
          tertiary: '#252529',
          quaternary: '#2A2A2E',
        },

        // Text colors
        text: {
          DEFAULT: '#F5F5F7',
          primary: '#F5F5F7',
          secondary: '#E1C379',
          tertiary: '#A8A8B0',
          quaternary: '#252529',
          muted: '#A8A8B0',
        },

        // Border colors
        border: {
          DEFAULT: '#3E3E3F',
          muted: '#252529',
          accent: '#E1C379',
          focus: '#5A5A5D',
        },

        // Accent colors - for highlights and primary actions
        accent: {
          DEFAULT: '#E1C379',
          hover: '#baa163',
          light: 'rgba(225, 195, 121, 0.1)',
        },

        // Delete/Destructive colors - for destructive actions
        delete: {
          DEFAULT: '#d2324a',
          background: 'rgba(210, 50, 74, 0.12)',
          hover: 'rgba(210, 50, 74, 0.2)',
          border: '#d2324a',
          text: '#d2324a',
        },
      },
    },
  },
}

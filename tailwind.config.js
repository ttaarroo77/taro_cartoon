module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/javascript/**/*.jsx',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f6f6f7',
          100: '#e3e3e5',
          200: '#c7c7cb',
          300: '#a6a6ad',
          400: '#8c8c94',
          500: '#71717a',
          600: '#515158',
          700: '#3f3f45',
          800: '#27272a',
          900: '#18181b',
          950: '#101012',
        },
        accent: {
          500: '#3b82f6',  // blue-500
          600: '#2563eb',  // blue-600
          700: '#1d4ed8',  // blue-700
        },
      },
    },
  },
  plugins: [],
} 
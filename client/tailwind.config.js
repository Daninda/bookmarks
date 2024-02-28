/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },

    colors: {
      surface: '#FFFFFF',
      darkSurface: '#1E1E1E',

      darkTransition: 'rgba(0, 0, 0, 30%)',

      background: '#F7F9FD',
      darkBackground: '#121212',

      accent: '#7D49F8',
      accentLight: '#B99CFC',

      textColor: '#202327',
      darkTextColor: '#FFFFFF',
      textGray: '#6B767F',

      gray: '#A7AEB4',
      grayLight: '#ECEDEE',

      error: 'rgb(255, 87, 87)',
    },

    borderRadius: {
      none: '0',
      sm: '.125rem',
      DEFAULT: '.4rem',
      full: '9999px',
    },

    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
    },
  },
  plugins: [],
};

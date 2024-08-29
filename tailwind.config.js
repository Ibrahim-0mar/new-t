/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0,
            visibility: 'hidden',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
            visibility: 'visible',
          },
        },
      },
      animation: {
        slideUp: 'slideUp 0.5s ease-in-out',
      },
      backgroundColor: {
        primary: '#F2F2F2',
        secondary: '#FFFFFF',
        tertiary: '#dddde5',
        fourthiary: '#0a425c',
        fifth: '#d6de29',
        sixth: '#f9f9f9',
        seventh: '#2BA6DE',
        eighth: '#eeeeee',
        ninth: '#cacaca',
        tenth: '#d5d5d5',
      },
      colors: {
        primary: '#0a425c',
        secondary: '#000000',
        tertiary: '#FFFFFF',
        fourthiary: '#f2f2f2',
        fifth: '#d6de29',
        sixth: '#2BA6DE',
        seventh: '#707070',
        eighth: '#062837',
        ninth: '#003a4f',
        tenth: '#1e2432',
        eleventh: '#d8d8d8',
        twelfth: '#646464',
        shadow: 'rgba(0, 0, 0, 0.32)',
        error: ' #cc0000',
      },
      dark: {
        backgroundColor: {
          primary: '#F2F2F2',
          secondary: '#062331',
          tertiary: '#dddde5',
          fourthiary: '#FFFFFF',
          fifth: '#D6DE29',
          sixth: '#f9f9f9',
          seventh: '#2BA6DE',
          eighth: '#eeeeee',
          ninth: '#cacaca',
        },
        colors: {
          primary: '#FFFFFF',
          secondary: '#FFFFFF',
          tertiary: '#FFFFFF',
          fourthiary: '#f2f2f2',
          fifth: '#d6de29',
          sixth: '#2BA6DE',
          seventh: '#707070',
          eighth: '#062837',
          ninth: '#003a4f',
          tenth: '#1e2432',
          eleventh: '#d8d8d8',
          twelfth: '#646464',
          shadow: 'rgba(0, 0, 0, 0.32)',
          error: ' #cc0000',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        yellowTail: ['var(--font-yellow-tail)'],
        roboto: ['var(--font-roboto)'],
        changa: ['var(--font-changa)'],
        reqaa: ['var(--font-aref-reqaa)']
      },
    },
    fontSize: {
      xxs: ['8px', '14px'],
      xs: ['10px', '16px'],
      sm: ['12px', '18px'],
      base: ['14px', '22px'],
      lg: ['16px', '24px'],
      xl: ['18px', '26px'],
      '2xl': ['22px', '30px'],
      '3xl': ['28px', '34px'],
      '4xl': ['34px', '42px'],
      '5xl': ['44px', '48px'],
      '6xl': ['56px', '56px'],
      '7xl': ['68px', '68px'],
      '8xl': ['80px', '80px'],


      
    
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#0a425c white',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#0a425c',
            borderRadius: '10px',
            border: '1px solid white',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
 
};

function range(start, end, increment = 1) {
  const count = Math.floor((end - start + increment) / increment);
  return Array(count).fill(0).map((_, idx) => start + idx * increment);
}

const minFontSize = 5;
const maxFontSize = 140;

const minSpacingPixel = 0;
const maxSpacingPixel = 1200;
const spacingPixelIncrement = 5;

const vhs = ['10vh', '20vh', '30vh', '40vh', '50vh', '60vh', '70vh', '80vh', '90vh', '100vh'];

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    screens: {
      'sm': '390px',
      'md': '835px',
      'lg': '1092px',
    },
    colors: {
      white: '#FFFFFF',
      primary: {
        DEFAULT: '#18058D',
        50: '#E5F6F6',
        75: '#5CB8BF',
        100: '#07A39D',
        200: '#009993',
        300: '#008F89',
        400: '#00857F',
      },
      secondary: {
        DEFAULT: '#CCD0DA',
        50: '#D2E3F3',
        100: '#0A2540',
      },
      success: {
        DEFAULT: '#39DB97',
        50: '#E8FCE6',
        75: '#BFE3BC',
        100: '#74B06F',
        200: '#63965F',
        400: '#158041'
      },
      warning: {
        DEFAULT: '#F8C645',
        50: '#FFF5E5',
        75: '#FFCB80',
        100: '#F18F01',
        200: '#E78500',
        300: '#DD7B00',
        400: '#D37100',
      },
      danger: {
        DEFAULT: '#CF5454',
        50: '#FFEDED',
        75: '#FFA3A3',
        100: '#E54D4D',
        200: '#CC4545',
      },
      light: {
        DEFAULT: '#A6A6A6',
        50: '#ECEEF0',
        75: '#E2E2E2',
        100: '#D6D6D6',
        200: '#A1A1A1',
        300: '#989898',
        400: '#6D6D6D',
        500: '#2C2C2C',
      },
      expired: {
        DEFAULT: '#9747FF',
      }
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1rem',
        lg: '1rem',
      },
    },
    keyframes: {
      'spinning': {
        '0%': { transform: 'rotateY(0deg)' },
        '100%': { transform: 'rotateY(360deg)' },
      },
    },
    animation: {
      'spinning': 'spinning 3s linear infinite',
    },
    fontFamily: {
      primary: ['Goldman'],
      archivo: ['Archivo'],
      poppins: ['Poppins'],
    },
    fontSize: {
      ...range(minFontSize, maxFontSize).reduce((merged, f) => ({ ...merged, [f]: `${f}px`}), {})
    },
    spacing: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {})
    },
    maxWidth: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {})
    },
    minWidth: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {})
    },
    maxHeight: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {}),
      ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {})
    },
    minHeight: {
      ...range(minSpacingPixel, maxSpacingPixel, spacingPixelIncrement).reduce((merged, f) => ({ ...merged, [f]: `${f}px` }), {}),
      ...vhs.reduce((merged, vh) => ({ ...merged, [vh]: vh }), {})
    },
    boxShadow: {
      primary: '0 5px 24px -10px rgba(0, 0, 0, 0.15)',
      DEFAULT: '0 5px 24px -10px rgba(0, 0, 0, 0.15)',
      secondary: '0 5px 20px rgba(0, 0, 0, 0.07)',
      warning: '0 10px 20px -5px rgba(211, 113, 0, 0.4)',
      light: '0 4px 20px -14px rgba(38, 50, 56, 0.35)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

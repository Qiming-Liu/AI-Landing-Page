import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        pink: '#F8597c',
        lightPink: '#FFF8F9',
        lightPinkLight: '#FFEEF1',
        red: '#FB2448',
        yellow: '#FCD34D',
        orange: '#F59E0B',
        skyBlue: '#EBF0FF',
        pantonePurple: '#8A8FB9',
        green: '#84CC16',
        deepBlue: '#0D0E43',
        offBlue: '#4C4DDC',
        black: '#0D0E43',
        pureBlack: '#000000',
        buttonGray: '#E7E7E7',
        buttonBlue: '#4C4DDC',
        buttonPinkHover: '#FD87A1',
        buttonGrayHover: '#DFDEDE',
        lightPurple: '#E4E4FF',
        backgroundGray: '#000000',
        borderGray: '#C5C4C4',
        boarderPink: '#FF8DA6',
        white: '#FFFFFF',
        bgGrey: '#EEEEEE',
        rosiness: '#F6315D',
        fontGrey: '#8A8FB9',
      },

      boxShadow: {
        custom: '0 3px 8px rgba(0, 0, 0, 0.25)',
      },
      padding: {
        '120': '120px',
      },
      height: {
        '433': '433px',
      },
      width: {
        '191': '191px',
        '24': '24px',
        '800': '800px',
      },

      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
      flex: {
        '2': '2',
        '3': '3',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;

import { extendTheme } from '@chakra-ui/react';
import { css } from '@emotion/react';

const Input = {
  variants: {
    outline: {
      field: {
        _focus: {
          borderColor: 'transparent',
          boxShadow: '0px 0px 0px 2px #AD90FF',
        },
      },
    },
  },
};

const Form = {
  baseStyle: { container: { padding: '2px' } },
};

export const theme = extendTheme({
  breakpoints: {
    '3xl': '108em',
    '2xl': '96em',
    base: '0em',
    lg: '62em',
    md: '48em',
    sm: '30em',
    xl: '80em',
  },
  sizes: {
    '9xl': '108rem',
    '10xl': '120em',
  },
  fonts: {
    heading: `'Museo Moderno', sans-serif`,
    headingLight: `'Museo Moderno Light', sans-serif`,
    // body: `'Baumans Regular', sans-serif``,
    headingAnton: `'Anton, sans-serif'`,
    headingExo2: `'Exo 2, sans-serif'`,
    headingOrbitron: `'Orbitron, sans-serif'`,
    headingRussoOne: `'Russo One, sans-serif'`,
  },
  
  colors: {
    main: '#03a5fc',
    ['main.100']: '#03a5fc10',
    ['main.200']: '#03a5fc20',
    ['main.300']: '#03a5fc30',
    ['main.400']: '#03a5fc40',
    ['main.500']: '#03a5fc50',
    ['main.600']: '#03a5fc60',
    ['main.700']: '#03a5fc70',
    ['main.800']: '#03a5fc80',
    ['main.900']: '#03a5fc90',
    ['main.950']: '#03a5fc95',
    pending: '#EFFF8F',
    rejected: '#FD86FF',
    neutral: '#BCBCBC',
  },
  shadows: {
    outline: '0px 0px 0px 2px #AD90FF',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Input,
    Form,
  },
});

export const globalStyles = css`

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #444444;
    border-radius: 2.5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #2df8c7;
    border-radius: 2.5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #1f7165;
  }
  body {
    scrollbar-color: #2df8c7 #444444;
    ::-webkit-scrollbar-track {
      background: #444444;
      border-radius: 0px;
    }
    background: #0d1117;
    overflow-x: hidden;
  }
  html,
  #__next {
    height: 100%;
  }
`;

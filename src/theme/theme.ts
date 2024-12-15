// theme.ts
import { createTheme } from '@mui/material/styles';

// Paletas de cores
export const light = {
  primary: {
    main: '#7367f0',
    contrastText: '#fff'
  },
  background: {
    default: '#F8F7FA',
    paper: '#fff'
  },
  text: {
    primary: '#000'
  }
};

export const dark = {
  primary: {
    main: '#7367f0',
    contrastText: '#fff'
  },
  background: {
    default: '#121212',
    paper: '#1D1D1D'
  },
  text: {
    primary: '#fff'
  }
};

// Função para criar o tema
export const getTheme = (mode: 'light' | 'dark') => {
  const themePalette = mode === 'light' ? light : dark;

  return createTheme({
    palette: {
      mode,
      ...themePalette
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: '0 .125rem .375rem 0 rgba(115, 103, 240, .3)',
            backgroundColor: '#7367f0',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#5b54c8'
            }
          }
        }
      }
    }
  });
};

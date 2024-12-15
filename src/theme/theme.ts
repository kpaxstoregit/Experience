import { createTheme } from '@mui/material/styles';

const light = {
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

const dark = {
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

// Cria o tema com base no modo dinâmico
export const getTheme = (mode: 'light' | 'dark') => {
  const themePalette = mode === 'light' ? light : dark;

  return createTheme({
    palette: {
      mode, // Define o modo: 'light' ou 'dark'
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

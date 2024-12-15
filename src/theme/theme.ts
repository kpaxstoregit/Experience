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

// Tipando `mode` como 'light' ou 'dark'
const mode: 'light' | 'dark' = 'dark';

const themePalette = mode === 'dark' ? dark : light;

const theme = createTheme({
  palette: {
    mode, // Define o modo, pode ser 'light' ou 'dark'
    ...themePalette // Aplica a paleta definida com base no modo
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

export default theme;

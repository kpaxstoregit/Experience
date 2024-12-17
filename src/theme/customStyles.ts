import { ThemeOptions } from '@mui/material/styles';

//Configurações globais do thema
export const customStyles: ThemeOptions = {
  typography: {
    fontFamily: 'Public Sans, Roboto, sans-serif'
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
};

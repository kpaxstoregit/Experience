import { ThemeOptions } from '@mui/material/styles';

import '@fontsource/public-sans/300.css'; // Light
import '@fontsource/public-sans/400.css'; // Regular
import '@fontsource/public-sans/500.css'; // Medium
import '@fontsource/public-sans/600.css'; // semi-bold
import '@fontsource/public-sans/700.css'; // Bold

//Configurações globais do thema
export const customStyles: ThemeOptions = {
  typography: {
    fontFamily: 'Public Sans, Roboto, sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
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

import { createTheme } from '@mui/material/styles';
import { useState, useEffect, useMemo } from 'react';

// Paletas de tema
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

// Hook para gerenciar e obter o tema dinâmico
export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') || 'dark';
    setDarkMode(savedMode === 'dark');
  }, []);

  const toggleDarkMode = () => {
    const newMode = darkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newMode);
    setDarkMode(!darkMode);
  };

  // Memoize o tema para evitar recriações desnecessárias
  const theme = useMemo(() => {
    const themePalette = darkMode ? dark : light;
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
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
  }, [darkMode]);

  return { darkMode, toggleDarkMode, theme };
};

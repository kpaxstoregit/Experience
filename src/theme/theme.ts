// theme.ts
import { createTheme } from '@mui/material/styles';
import { light } from './colors/light';
import { dark } from './colors/dark';
import { customStyles } from './customStyles';

// Função para criar o tema
export const getTheme = (mode: 'light' | 'dark') => {
  const palette = mode === 'light' ? light : dark;

  // Criando o tema passando as configuracoes default e a paleta de cores
  return createTheme({
    ...customStyles,
    palette: {
      mode,
      ...palette
    }
  });
};

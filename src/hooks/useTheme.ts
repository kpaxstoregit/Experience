import { useState } from 'react';
import { getTheme } from '@/theme/theme'; // Importando a função de criação do tema

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Carrega o valor inicial do tema do localStorage ou usa 'dark' como padrão
    const savedMode = localStorage.getItem('theme') || 'dark';
    return savedMode === 'dark';
  });

  // Função para alternar entre os modos light e dark
  const toggleDarkMode = () => {
    const newMode = darkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newMode);
    setDarkMode(!darkMode);
  };

  // Cria o tema dinamicamente com base no darkMode
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return { darkMode, toggleDarkMode, theme };
};

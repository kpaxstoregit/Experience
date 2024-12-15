// hooks/useTheme.ts
import { useState, useEffect } from 'react';
import { getTheme } from '@/theme/theme'; // Importando a função de criação do tema

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Carregar o estado do modo do localStorage ao iniciar
  useEffect(() => {
    const savedMode = localStorage.getItem('theme') || 'dark';
    setDarkMode(savedMode === 'dark');
  }, []);

  // Função para alternar entre os modos
  const toggleDarkMode = () => {
    const newMode = darkMode ? 'light' : 'dark';
    localStorage.setItem('theme', newMode);
    setDarkMode(!darkMode);
  };

  // Cria o tema dinamicamente com base no modo
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return { darkMode, toggleDarkMode, theme };
};

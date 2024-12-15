'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/theme/theme';
export default function EmptyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Cria o tema dinamicamente com base no estado atual
  const darkMode = 'light';
  const theme = getTheme(darkMode ? 'dark' : 'light');
  return (
    <html lang='pt-br'>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

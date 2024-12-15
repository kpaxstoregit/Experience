'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme/theme';
export default function EmptyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <main> {children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/hooks/useTheme';
import { Card, Container, Typography } from '@mui/material';
export default function EmptyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Cria o tema dinamicamente com base no estado atual
  const { theme } = useTheme();

  return (
    <html lang='pt-br'>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            maxWidth='sm'
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh'
            }}
          >
            <Card
              className='ex-shadow'
              sx={{
                width: '100%',
                maxWidth: 460,
                padding: '2rem',

                boxShadow: '0 0.1875rem 0.75rem 0 rgba(47, 43, 61, 0.14)'
              }}
            >
              <Typography
                textAlign='center'
                fontSize='2rem'
                fontWeight='700'
                mb={3}
              >
                Logo
              </Typography>
              {children}
            </Card>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}

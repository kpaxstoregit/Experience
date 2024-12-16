'use client';

import { useTheme } from '@/hooks/useTheme';
import { Card, Container, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

export default function EmptyLayout({
  children
}: {
  children: React.ReactNode;
}) {
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
              height: '100vh',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Card de Login */}
            <Card
              className='ex-shadow'
              sx={{
                position: 'relative',
                zIndex: 10,
                width: '100%',
                maxWidth: 460,
                padding: '2rem',
                boxShadow: '0 0.1875rem 0.75rem 0 rgba(47, 43, 61, 0.14)',
                background: 'white', // Fundo branco para o card
                borderRadius: '16px' // Border radius opcional
              }}
            >
              <Typography
                textAlign='center'
                fontSize='2rem'
                fontWeight='700'
                mb={3}
                color='primary.main' // Cor primária definida no tema
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

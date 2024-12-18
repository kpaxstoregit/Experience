'use client';

import AuthAbstracLeft from '@/assets/svg/AuthAbstractLeft';
import AuthAbstracRight from '@/assets/svg/AuthAbstractRight';
import { AuthProvider } from '@/context/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { Card, Container, Typography, Box, Paper } from '@mui/material';
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

          <AuthProvider>
            <Box>
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
                <Box
                  display={'flex'}
                  width={'600px'}
                  justifyContent={'center'}
                  position='relative'
                >
                  {/* SVG left */}
                  <AuthAbstracLeft />

                  {/* Card de Login */}
                  <Card
                    sx={{
                      position: 'relative',
                      backgroundClip: 'padding-box',
                      boxShadow: '0 .1875rem .75rem 0 rgba(19, 17, 32, .2)',
                      zIndex: 10,
                      width: '100%',
                      maxWidth: 460,
                      padding: '2rem'
                    }}
                  >
                    <Typography
                      textAlign='center'
                      fontSize='1.4rem'
                      fontWeight='700'
                      mb={3}
                      color='primary.main'
                    >
                      Logo
                    </Typography>
                    {children}
                  </Card>
                  {/* SVG right */}
                  <AuthAbstracRight />
                </Box>
              </Container>
            </Box>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

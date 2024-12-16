'use client';

import { useTheme } from '@/hooks/useTheme';
import { Card, Container, Typography, Box } from '@mui/material';
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
            <Box
              display={'flex'}
              width={'700px'}
              justifyContent={'center'}
              position='relative'
            >
              {/* Primeiro SVG */}
              <Box
                position={'absolute'}
                top={'-55px'}
                left={'-8px'}
                width={'238px'}
                height={'239px'}
                zIndex={-1}
              >
                <svg
                  width='239'
                  height='234'
                  viewBox='0 0 239 234'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='88.5605'
                    y='0.700195'
                    width='149'
                    height='149'
                    rx='19.5'
                    stroke='#7367F0'
                    stroke-opacity='0.16'
                  />
                  <rect
                    x='0.621094'
                    y='33.761'
                    width='200'
                    height='200'
                    rx='10'
                    fill='#7367F0'
                    fill-opacity='0.08'
                  />
                </svg>
              </Box>

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
                  background: 'white',
                  borderRadius: '16px'
                }}
              >
                <Typography
                  textAlign='center'
                  fontSize='2rem'
                  fontWeight='700'
                  mb={3}
                  color='primary.main'
                >
                  Logo
                </Typography>
                {children}
              </Card>

              {/* Segundo SVG */}
              <Box
                position={'absolute'}
                right={'-8px'}
                bottom={'-55px'}
                width={'181px'}
                height={'181px'}
                zIndex={-1}
              >
                <svg
                  width='181'
                  height='181'
                  viewBox='0 0 181 181'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='1.30469'
                    y='1.44312'
                    width='178'
                    height='178'
                    rx='19'
                    stroke='#7367F0'
                    stroke-opacity='0.16'
                    stroke-width='2'
                    stroke-dasharray='8 8'
                  />
                  <rect
                    x='22.8047'
                    y='22.9431'
                    width='135'
                    height='135'
                    rx='10'
                    fill='#7367F0'
                    fill-opacity='0.08'
                  />
                </svg>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}

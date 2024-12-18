'use client';

import AuthAbstracLeft from '@/assets/svg/AuthAbstractLeft';
import AuthAbstracRight from '@/assets/svg/AuthAbstractRight';
import { AuthProvider } from '@/context/AuthContext';
import { useTheme } from '@/hooks/useTheme';
import { Card, Container, Typography, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                      padding: '2.8rem 2rem'
                    }}
                  >
                    <Typography
                      textAlign='center'
                      fontSize='2rem'
                      fontWeight='700'
                      mb={3}
                      color='text.primary'
                      letterSpacing={1.8}
                    >
                      Experience
                    </Typography>
                    {children}
                  </Card>
                  {/* SVG right */}
                  <AuthAbstracRight />
                </Box>
              </Container>
            </Box>
            {/* Configuração do ToastContainer */}
            <ToastContainer
              position='top-right' // Posição dos toasts
              autoClose={5000} // Duração de 5 segundos
              hideProgressBar={false} // Barra de progresso visível
              newestOnTop={true} // Sempre mostra os novos toasts em cima
              closeOnClick={true} // Permite fechar o toast ao clicar
              rtl={false} // Direção da animação
              pauseOnFocusLoss={false} // Não pausa se a página perde o foco
              draggable={false} // Desabilita a funcionalidade de arrastar
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

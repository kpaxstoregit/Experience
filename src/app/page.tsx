'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Checkbox,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const HomePage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false); // Definindo o estado de 'Lembrar-me'

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const formValues = watch();
  const hasInteracted = Object.values(formValues).some((value) => value !== '');

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const result = await response.json();
      console.log('Login bem-sucedido!', result);
      alert('Login bem-sucedido!');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente.');
    }
  };

  return (
    <>
      <CardHeader
        title='Bem vindo 👋'
        subheader='Faça login em sua conta e comece a aventura'
        titleTypographyProps={{
          mb: 0.5,
          fontWeight: 500
        }}
        subheaderTypographyProps={{
          maxWidth: '80%',
          fontSize: '15px' // Define 15 pixels para o subheader
        }}
      />
      <CardContent sx={{ pt: 1 }}>
        <Box
          display='flex'
          gap={3}
          flexDirection='column'
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Email */}
          <Box>
            <Typography fontSize='0.8125rem' mb={0.5}>
              Email
            </Typography>
            <TextField
              placeholder='Digite o seu e-mail'
              fullWidth
              size='small'
              variant='outlined'
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>
          {/* Senha */}
          <Box>
            <Typography fontSize='0.813rem' mb={0.5}>
              Senha
            </Typography>
            <TextField
              fullWidth
              placeholder='············'
              size='small'
              type={showPassword ? 'text' : 'password'}
              variant='outlined'
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          {/* Lembrar-me */}
          <Stack
            spacing={2}
            direction={'row'}
            justifyContent='space-between'
            alignItems='center'
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              my={2}
              alignItems='center'
            >
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
                id='rememberMe' // ID para associar ao label
              />
              <Typography fontSize='15px'>Lembrar-me</Typography>
            </Box>
            <Link href='/esqueci-senha' style={{ textDecoration: 'none' }}>
              <Typography
                fontSize='15px'
                fontWeight={500}
                sx={{ textDecoration: 'none' }}
                color='primary'
              >
                Esqueceu a senha?
              </Typography>
            </Link>
          </Stack>

          <Button
            type='submit'
            sx={{
              height: 40,
              textTransform: 'initial',
              fontWeight: 600,
              fontSize: '15px'
            }}
            fullWidth
            variant='contained'
            color='primary'
            disabled={hasInteracted && !isValid}
          >
            Entrar
          </Button>

          <Box display={'flex'} justifyContent={'center'} gap='6px'>
            <Typography fontSize={'15px'}>Novo na Plataforma?</Typography>
            <Link href='/registrar' style={{ textDecoration: 'none' }}>
              <Typography color='primary'>Criar uma conta</Typography>
            </Link>
          </Box>
        </Box>
      </CardContent>
    </>
  );
};

export default HomePage;

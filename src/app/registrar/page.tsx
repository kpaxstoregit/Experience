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
const registerSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
});

type LoginFormInputs = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false); // Definindo o estado de 'Lembrar-me'

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(registerSchema),
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
          fontSize: '15px'
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
          {/* Confirmar Senha */}
          <Box>
            <Typography fontSize='0.813rem' mb={0.5}>
              Confirmar Senha
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
          {/* Termos e politicas */}
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

              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap='6px'
              >
                <Typography fontSize={'15px'}>Eu concordo com os</Typography>
                <Link href='/registrar' style={{ textDecoration: 'none' }}>
                  <Typography color='primary'>termos e politicas</Typography>
                </Link>
              </Box>
            </Box>
          </Stack>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={hasInteracted && !isValid}
          >
            Cadastrar
          </Button>

          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap='6px'
          >
            <Typography fontSize={'15px'}>Ja tem uma conta?</Typography>
            <Link href='/' style={{ textDecoration: 'none' }}>
              <Typography color='primary'>Entrar</Typography>
            </Link>
          </Box>
        </Box>
      </CardContent>
    </>
  );
};

export default RegisterPage;

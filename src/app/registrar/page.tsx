'use client';

import { auth } from '@/lib/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
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
  Stack,
  CircularProgress
} from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Regex para validação de senha
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

// Validation schema
const registerSchema = z
  .object({
    email: z.string().email('E-mail inválido'),
    password: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(
        passwordRegex,
        'A senha deve ter 1 letra maiúscula e 1 caractere especial'
      ),
    confirmPassword: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(
        passwordRegex,
        'A senha deve ter 1 letra maiúscula e 1 caractere especial'
      )
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'] // Aplica o erro ao campo 'confirmPassword'
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const formValues = watch();
  const hasInteracted = Object.values(formValues).some((value) => value !== '');

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      // Firebase Signup
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (response.user) toast.success('Cadastro realizado! 🎉');
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('auth/email-already-in-use')) {
          toast.error('Esse email já foi cadastrado');
        }
      } else {
        toast.error('Erro ao cadastrar, tente novamente mais tarde');
      }
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
              type={showConfirmPassword ? 'text' : 'password'}
              variant='outlined'
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      edge='end'
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            {isSubmitting ? (
              <CircularProgress sx={{ color: 'white' }} size={24} />
            ) : (
              'Cadastrar'
            )}
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

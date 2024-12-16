'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Validation schema
const registerSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const formValues = watch();
  const hasInteracted = Object.values(formValues).some((value) => value !== '');

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const result = await response.json();
      console.log('Cadastro  bem-sucedido!', result);
      alert('Cadastro efetuado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <>
      <CardHeader
        title='A Aventura começá aqui 🚀'
        subheader='Torne o gerenciamento das suas tarefas fácil e divertido!
'
      />
      <CardContent>
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
            <Typography fontSize='0.813rem' mb={0.5} color='#444050'>
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
            <Typography fontSize='0.813rem' mb={0.5} color='#444050'>
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
            <Typography fontSize='0.813rem' mb={0.5} color='#444050'>
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
          <Box my={2}>
            <Button
              type='submit'
              sx={{ height: 40 }}
              fullWidth
              variant='contained'
              color='primary'
              disabled={hasInteracted && !isValid}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </CardContent>
    </>
  );
};

export default RegisterPage;

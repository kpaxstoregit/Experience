'use client';
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha todos os campos!');
      return;
    }
    console.log('Dados enviados:', { email, password });
    setError('');
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8 }}>
      <Typography variant='h5' component='h1'>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin='normal'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          margin='normal'
          label='Senha'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color='error'>{error}</Typography>}
        <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }}>
          Entrar
        </Button>
      </form>
    </Box>
  );
}

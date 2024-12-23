'use client';

import { useApi } from '@/hooks/useApi';
import { Avatar, Box, Card, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface Hero {
  id?: string;
  name?: string;
  profession?: string;
  descriptionLong?: string;
  prase?: string;
  avatar?: string;
}

// Galeria de personagens
export default function HeroGallery() {
  const { data: heros = [], loading } = useApi('heros');

  // Inicializa o estado com o primeiro personagem selecionado, se disponível
  const [hoveredId, setHoveredId] = useState<string | null>(
    heros.length > 0 ? heros[0]?.id : null
  );

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
  };

  const hoveredCharacter: Hero | undefined = heros.find(
    (char) => char.id === hoveredId
  );

  // Define o primeiro personagem como selecionado após carregar os dados
  useEffect(() => {
    if (heros.length > 0) {
      setHoveredId(heros[0].id);
    }
  }, [heros]);

  return (
    <>
      <Box textAlign='left' mt={3}>
        <Typography
          variant='h6'
          color='white'
          gutterBottom
          sx={{ letterSpacing: '1.5px' }}
        >
          ESCOLHA SEU HERÓI
        </Typography>

        {/* Detalhes do personagem no hover */}

        <Box>
          {hoveredCharacter && !loading && (
            <Card>
              <Box
                display='flex'
                alignItems={'center'}
                width={'100%'}
                gap={3}
                p={2}
              >
                <Avatar
                  variant='square'
                  alt='Travis Howard'
                  src={hoveredCharacter.avatar}
                  sx={{
                    width: 205,
                    height: 250,
                    borderRadius: '4px',
                    boxShadow: '0px 8px 15px rgba(34, 16, 58, 0.2)',
                    border: '4px solid rgba(81, 29, 148, 0.2)'
                  }}
                />
                <Box maxWidth={'500px'} ml={2}>
                  <Typography variant='h5' fontWeight='bold' mb={1}>
                    {hoveredCharacter.name}
                  </Typography>
                  <Typography variant='body1' color='primary'>
                    {hoveredCharacter.profession}
                  </Typography>
                  <Typography variant='body2' mb={3}>
                    {hoveredCharacter.descriptionLong}
                  </Typography>
                  <Typography variant='body2' color='primary'>
                    "{hoveredCharacter.prase}"
                  </Typography>
                </Box>
              </Box>
            </Card>
          )}
          {!loading && (
            <Grid container gap={3} justifyContent='center' mt={5}>
              {heros.map((hero) => (
                <Grid
                  item
                  key={hero.id}
                  onMouseEnter={() => handleMouseEnter(hero.id)}
                  sx={{
                    transition: 'transform 0.4s ease, filter 0.4s ease',
                    transform:
                      hoveredId === hero.id ? 'scale(1.1)' : 'scale(1)',
                    filter: hoveredId !== hero.id ? 'grayscale(100%)' : 'none',
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}
                  >
                    <Avatar
                      alt='Travis Howard'
                      src={hero?.avatar}
                      sx={{
                        width: '140px',
                        height: 'auto',
                        border:
                          hoveredId === hero.id
                            ? '2px solid #512D94'
                            : '2px solid transparent',
                        transition: 'border 0.4s ease'
                      }}
                    />
                  </Box>

                  <Typography
                    textAlign='center'
                    variant='body2'
                    mt={1}
                    color='primary'
                  >
                    {hero?.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
}

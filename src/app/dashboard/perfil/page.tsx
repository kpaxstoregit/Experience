'use client';
import { useApi } from '@/hooks/useApi';
import { Box, Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import avatarHero from '@/public/images/heros/hank_strider.jpg';

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
      <Box textAlign='left' mt={4} p={4}>
        <Typography variant='h3' color='white' fontWeight='bold' gutterBottom>
          SELECIONE O SEU HERÓI
        </Typography>
        <Typography variant='body1' fontWeight='bold' gutterBottom>
          Cada herói tem uma profissão específica, procure se especializar em
          alguma delas 🤖
        </Typography>
        {/* Detalhes do personagem no hover */}

        <Box>
          {hoveredCharacter && !loading && (
            <Card
              sx={{
                height: '400px',
                borderRadius: '8px',
                width: '100%',
                padding: '2rem',
                marginBottom: '1.5rem',
                color: 'white',
                display: 'inline-block'
              }}
            >
              <Box display='flex' width={'100%'} gap={3}>
                <Box
                  style={{
                    borderRadius: '100px',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
                    backgroundImage: `url(${avatarHero.src})`, // Usando a imagem como fundo
                    backgroundSize: 'cover', // Faz a imagem cobrir todo o elemento
                    backgroundPosition: 'center', // Centraliza a imagem
                    width: '200px',
                    height: '200px', // Definindo uma altura
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}
                ></Box>
                <Box maxWidth={'80%'}>
                  <Typography variant='h2' fontWeight='bold' mb={1}>
                    {hoveredCharacter.name}
                  </Typography>
                  <Typography variant='h6'>
                    {hoveredCharacter.profession}
                  </Typography>
                  <Typography variant='h6' mb={3}>
                    {hoveredCharacter.descriptionLong}
                  </Typography>
                  <Typography variant='h6'>{hoveredCharacter.prase}</Typography>
                </Box>
              </Box>
            </Card>
          )}
          {!loading && (
            <Grid container spacing={3} justifyContent='center'>
              {heros.map((character) => (
                <Grid
                  item
                  key={character.id}
                  onMouseEnter={() => handleMouseEnter(character.id)}
                  sx={{
                    transition: 'transform 0.3s ease',
                    transform:
                      hoveredId === character.id ? 'scale(1.1)' : 'scale(1)',
                    '&:hover': {
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Card
                    sx={{
                      position: 'relative',
                      width: 150,
                      height: 150,
                      borderRadius: '8px',
                      overflow: 'hidden',
                      boxShadow:
                        hoveredId === character.id
                          ? '0px 8px 15px rgba(0, 0, 0, 0.2)'
                          : 'none'
                    }}
                  >
                    <Box
                      style={{
                        backgroundImage: `url(${avatarHero.src})`, // Usando a imagem como fundo
                        backgroundSize: 'cover', // Faz a imagem cobrir todo o elemento
                        backgroundPosition: 'center', // Centraliza a imagem
                        width: '100%',
                        height: '100%', // Definindo uma altura
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        padding: '1rem'
                      }}
                    ></Box>
                  </Card>
                  <Typography variant='body1' mt={1} color='white'>
                    {character?.name}
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

'use client';

import { useApi } from '@/hooks/useApi';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

// Lista de personagens

// Galeria de personagens
export default function HeroGallery() {
  const { data: heros = [], loading } = useApi('heros');

  // Inicializa o estado com o primeiro personagem selecionado
  const [hoveredId, setHoveredId] = useState<string | null>(heros[0]?.id);

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
  };

  const hoveredCharacter = heros.find((char) => char.id === hoveredId);

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
          {hoveredCharacter && (
            <Box
              sx={{
                background: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1.5rem',
                color: 'white',
                display: 'inline-block'
              }}
            >
              <Typography variant='h5' fontWeight='bold'>
                {hoveredCharacter.name} ({hoveredCharacter.role})
              </Typography>
              <Typography variant='body1'>
                <strong>Profissão:</strong> {hoveredCharacter.profession}
              </Typography>
            </Box>
          )}

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
                <Box
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
                  {/* <Image
                src={character.img}
                alt={character.name}
                fill
                style={{ objectFit: 'cover' }}
              /> */}
                </Box>
                <Typography variant='body1' mt={1} color='white'>
                  {character.name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

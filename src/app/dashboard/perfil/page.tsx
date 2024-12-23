'use client';

import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useApi } from '@/hooks/useApi';

interface Heros {
  id: string;
  name: string;
  role: string;
  profession: string;
  attributes: string;
  img: string;
}

// Lista de personagens
const characters = [
  {
    id: 1,
    name: 'Iris Vyn',
    role: 'Designer',
    profession: 'UX/UI Specialist',
    attributes: 'Criatividade, Estilo, Precisão',
    img: '/images/iris-vyn.png'
  },
  {
    id: 2,
    name: 'Hank Strider',
    role: 'Frontend Developer',
    profession: 'Interface Builder',
    attributes: 'Agilidade, Lógica, Estilo Futurista',
    img: '/images/hank-strider.png'
  }
  // Adicione os outros 10 personagens aqui com { id, name, role, profession, attributes, img }
];

// Galeria de personagens
export default function Perfil() {
  const { data: heros = [] } = useApi('heros');

  // Inicializa o estado com o primeiro personagem selecionado
  const [hoveredName, setHoveredName] = useState<string | null>(
    characters[0]?.name || null
  );

  const handleMouseEnter = (name: string) => {
    setHoveredName(name);
  };

  const hoveredCharacter = characters.find((char) => char.name === hoveredName);
  return (
    <Box textAlign='left' mt={4} p={4}>
      <Typography variant='h3' color='white' fontWeight='bold' gutterBottom>
        SELECIONE O SEU HERÓI
      </Typography>
      <Typography variant='body1' fontWeight='bold' gutterBottom>
        Cada herói tem uma profissão específica, procure se especializar em
        alguma delas 🤖
      </Typography>

      {/* <pre>{JSON.stringify(heros, null, 2)}</pre> */}
      {/* Detalhes do personagem no hover */}
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
          <Typography variant='body2'>
            <strong>Atributos:</strong> {hoveredCharacter.attributes}
          </Typography>
        </Box>
      )}

      <Grid container spacing={3} justifyContent='center'>
        {characters.map((character) => (
          <Grid
            item
            key={character.id}
            onMouseEnter={() => handleMouseEnter(character.name)}
            sx={{
              transition: 'transform 0.3s ease',
              transform:
                hoveredName === character.name ? 'scale(1.1)' : 'scale(1)',
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
                  hoveredName === character.name
                    ? '0px 8px 15px rgba(0, 0, 0, 0.2)'
                    : 'none'
              }}
            >
              <Image
                src={character.img}
                alt={character.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Typography variant='body1' mt={1} color='white'>
              {character.name}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

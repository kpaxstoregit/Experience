import {
  Typography,
  Box,
  Stack,
  Card,
  Button,
  Grid,
  Icon
} from '@mui/material';

export default function Home() {
  const resumeCards = [
    { id: 1, title: 'Restantes', content: '4', icon: '' },
    { id: 2, title: 'Completas', content: '12', icon: '' },
    { id: 3, title: 'Em andamento', content: '4', icon: '' },
    { id: 4, title: 'Revisando', content: '1', icon: '' }
  ];

  return (
    <div>
      <Stack className='width-default'>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={2}
        >
          <Box
            mb={2}
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography variant='h5' fontWeight='700' color='primary' my={2}>
              Que bom te ver por aqui Rafa!
            </Typography>
            <Button variant='contained' color='primary'>
              Nova tarefa
            </Button>
          </Box>
        </Box>

        <Box>
          <Grid container spacing={2}>
            {resumeCards.map((card) => (
              <Grid item xs={12} sm={6} md={3} key={card.id}>
                <Card className='ex-shadow' sx={{ p: 3 }}>
                  Icon
                  <Typography variant='h6' fontWeight='700' my={2}>
                    {card.title}
                  </Typography>
                  <Typography variant='h6' fontWeight='700' my={2}>
                    {card.content}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </div>
  );
}

'use client';

import { useTaskStore } from '@/store/taskStore';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Pagination,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function Home() {
  const { tasks, fetchTasks, addTask, deleteTask } = useTaskStore();
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Número de tarefas por página

  // Busca as tarefas ao carregar o componente
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Paginação: divide as tarefas em páginas
  const paginatedTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  return (
    <Paper
      elevation={0}
      sx={{
        minHeight: '100vh',
        justifyContent: 'center'
      }}
    >
      <Stack className='width-default'>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={2}
        >
          <Typography variant='h5'>Gerenciamento de Tarefas</Typography>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              addTask({
                id: tasks.length + 1,
                title: `Nova Tarefa ${tasks.length + 1}`,
                description: 'Descrição da nova tarefa',
                status: 'Pendente',
                priority: 'Média'
              })
            }
          >
            Adicionar Tarefa
          </Button>
        </Box>

        {/* Cards Resumo */}
        <Grid container spacing={2} mb={2}>
          {[
            {
              title: 'Restantes',
              content: tasks.filter((t) => t.status === 'Pendente').length
            },
            {
              title: 'Completas',
              content: tasks.filter((t) => t.status === 'Completa').length
            },
            {
              title: 'Em andamento',
              content: tasks.filter((t) => t.status === 'Em andamento').length
            }
          ].map((card, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>{card.title}</Typography>
                  <Typography variant='h4'>{card.content}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Lista de Tarefas */}
        <Grid container spacing={2}>
          {paginatedTasks.map((task) => (
            <Grid item xs={12} key={task.id}>
              <Card>
                <CardContent>
                  <Typography variant='h6'>{task.title}</Typography>
                  <Typography>{task.description}</Typography>
                  <Typography>Status: {task.status}</Typography>
                  <Typography>Prioridade: {task.priority}</Typography>
                  <Button color='error' onClick={() => deleteTask(task.id)}>
                    Excluir
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Paginação */}
        <Box mt={4} display={'flex'} justifyContent={'center'}>
          <Pagination
            count={Math.ceil(tasks.length / tasksPerPage)}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
          />
        </Box>
      </Stack>
    </Paper>
  );
}

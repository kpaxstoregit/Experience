'use client';

import { useApi } from '@/hooks/useApi';
import { db } from '@/lib/firebase';
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
import { collection, doc, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { mutate, preload } from 'swr';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
}

// Função para buscar as tarefas
const fetchTasks = async (): Promise<Task[]> => {
  const querySnapshot = await getDocs(collection(db, 'tasks'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as Task[];
};

//recurso do swr para pre-carregar
preload('tasks', fetchTasks);

// Componente principal
export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Número de tarefas por página

  // Invocando o hook de API (ele vai gerenciar o GET automaticamente)
  const { post, del, data: tasks = [] } = useApi('tasks');

  // Função para adicionar uma nova tarefa
  const handleAddTask = async () => {
    const newTask = {
      title: `Nova Tarefa ${tasks.length + 1}`,
      description: 'Descrição da nova tarefa',
      status: 'Pendente',
      priority: 'Média'
    };

    // Adiciona a nova tarefa ao Firestore
    const docRef = await post('tasks', newTask);
    // Adiciona a nova tarefa ao estado local (tarefa com ID gerado pelo Firestore)
    mutate('tasks', [...tasks, { id: docRef.id, ...newTask }], false);
  };

  // Deletar uma tarefa e atualiza o estado
  const handleDeleteTask = async (id: string) => {
    await del('tasks', id);
    mutate(
      'tasks',
      tasks.filter((task) => task.id !== id),
      false
    );
  };

  // Paginação: divide as tarefas em páginas
  const paginatedTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  return (
    <Paper elevation={0} sx={{ minHeight: '100vh', justifyContent: 'center' }}>
      <Stack className='width-default'>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={2}
        >
          <Typography variant='h5'>Gerenciamento de Tarefas</Typography>
          <Button variant='contained' color='primary' onClick={handleAddTask}>
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
                  <Button
                    color='error'
                    onClick={() => handleDeleteTask(task.id)}
                  >
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

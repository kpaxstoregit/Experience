'use client';

import { useApi } from '@/hooks/useApi';
import { db } from '@/lib/firebase';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Pagination,
  Button,
  Stack,
  Typography
} from '@mui/material';
import { collection, doc, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { mutate, preload } from 'swr';
import DashboardStatus from './components/DashboardStatus';

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

//Recurso do swr para pre-carregar
preload('tasks', fetchTasks);

// Componente principal
export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Número de tarefas por página

  // Invocando o hook de API (ele vai gerenciar o GET automaticamente)
  const { data: tasks = [], post, del } = useApi('tasks');

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

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // Status das tarefas
  const tasksStatusItems = [
    {
      id: '1',
      title: 'Restantes',
      content: tasks.filter((t) => t.status === 'Pendente').length
    },
    {
      id: '2',
      title: 'Completas',
      content: tasks.filter((t) => t.status === 'Completa').length
    },
    {
      id: '3',
      title: 'Em andamento',
      content: tasks.filter((t) => t.status === 'Em andamento').length
    }
  ];

  return (
    <main>
      {/* Resumo das Tarefas */}
      <Box mt={3} display='flex' justifyContent='space-between'>
        <DashboardStatus tasksStatus={tasksStatusItems} />
        <Box>
          <Button variant='contained' color='primary' onClick={handleAddTask}>
            Adicionar
          </Button>
        </Box>
      </Box>
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
                <Button color='error' onClick={() => handleDeleteTask(task.id)}>
                  Excluir
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Paginação */}
      <Pagination
        sx={{ m: '1.125rem auto' }}
        count={Math.ceil(tasks.length / tasksPerPage)}
        page={currentPage}
        onChange={(_, page) => setCurrentPage(page)}
      />
    </main>
  );
}

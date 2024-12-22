'use client';
import { Card, CardContent, Typography, Button } from '@mui/material';

// Tipagem de acordo com a estrutura da store
interface TaskCardProps {
  data: {
    title: string;
    description: string;
    status: string;
    priority: string;
  };
  onDelete: () => void;
}

const TaskCard = ({ data, onDelete }: TaskCardProps) => {
  // Verificação para garantir que data não é undefined
  if (!data) {
    return null; // Ou renderize algo que indique que os dados não foram encontrados
  }

  const { title, description, status, priority } = data; // Desestruturação dos dados passados

  return (
    <Card>
      <CardContent>
        <Typography variant='h6'>{title}</Typography>
        <Typography variant='body1'>{description}</Typography>
        <Typography>Status: {status}</Typography>
        <Typography>Prioridade: {priority}</Typography>

        {/* Botão de deletar */}
        <Button color='error' onClick={onDelete}>
          Deletar
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

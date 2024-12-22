import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

interface DashboardStatusProps {
  tasksStatus: {
    id: string;
    title: string;
    content: number;
  }[];
}

export default function DashboardStatus({ tasksStatus }: DashboardStatusProps) {
  return (
    <Grid container spacing={2} mb={2}>
      {tasksStatus.map((task, index) => (
        <Grid item xs={12} sm={4} md={3} key={index}>
          <Card>
            <CardContent>
              <Typography variant='h6'>{task.title}</Typography>
              <Typography variant='h4'>{task.content}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

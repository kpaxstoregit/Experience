import { create } from 'zustand';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
}

interface TaskState {
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  addTask: (newTask: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: number) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const response = await fetch('http://localhost:3001/tasks');
    const data = await response.json();
    set({ tasks: data });
  },

  addTask: (newTask) => {
    set((state) => ({
      tasks: [...state.tasks, newTask]
    }));
  },

  updateTask: (updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }));
  }
}));

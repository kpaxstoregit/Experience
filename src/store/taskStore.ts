import { create } from 'zustand';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Task {
  id: string; // Firestore gera IDs únicos automaticamente
  title: string;
  description: string;
  status: string;
  priority: string;
}

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (newTask: Task) => Promise<void>;
  updateTask: (updatedTask: Task) => Promise<void>;
  deleteTask?: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      set({ tasks, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  addTask: async (newTask) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        priority: newTask.priority
      }); // O Firestore gera o ID automaticamente
      set((state) => ({
        tasks: [...state.tasks, { ...newTask, id: docRef.id }] // Adiciona o ID gerado pelo Firestore ao estado
      }));
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  updateTask: async (updatedTask) => {
    if (!updatedTask.id) return;
    try {
      const taskRef = doc(db, 'tasks', updatedTask.id);
      await updateDoc(taskRef, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      }));
    } catch (err) {
      set({ error: (err as Error).message });
    }
  },

  deleteTask: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const taskRef = doc(db, 'tasks', id); // Obtenha a referência do documento
      await deleteDoc(taskRef); // Apague o documento
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id), // Atualize a lista de tarefas
        isLoading: false
      }));
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  }
}));

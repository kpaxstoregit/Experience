// store/authStore.ts

import { create } from 'zustand';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { toast } from 'react-toastify';

interface AuthState {
  user: { uid: string; email: string | null } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initializeAuthState: () => Promise<boolean>; // Retorna se o usuário está logado
}

export const useAuthStore = create<AuthState>((set) => {
  // Função para atualizar o estado do usuário e o `localStorage`
  const updateUserState = (
    user: { uid: string; email: string | null } | null
  ) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Salva o usuário no localStorage
    } else {
      localStorage.removeItem('user');
    }
  };

  const initializeAuthState = async (): Promise<boolean> => {
    // Verifica o localStorage ao inicializar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      updateUserState(JSON.parse(storedUser));
      return true;
    }

    return new Promise((resolve) => {
      // Escuta o estado de autenticação do Firebase
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          updateUserState({
            uid: firebaseUser.uid,
            email: firebaseUser.email
          });
          resolve(true);
        } else {
          updateUserState(null);
          resolve(false);
        }
      });
    });
  };

  return {
    user: null,

    login: async (email, password) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const loggedInUser = userCredential.user;
        updateUserState({
          uid: loggedInUser.uid,
          email: loggedInUser.email
        });
        toast.success('Login efetuado com sucesso! 🎉');
        window.location.href = '/dashboard';
      } catch (error: unknown) {
        if (error instanceof Error) {
          let errorMessage = 'Erro ao fazer login. Tente novamente.';
          if (error.code === 'auth/invalid-credential') {
            errorMessage =
              'Credenciais inválidas. Verifique seu e-mail e senha.';
          } else if (error.code === 'auth/user-not-found') {
            errorMessage = 'Usuário não encontrado. Verifique seu e-mail.';
          } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Senha incorreta. Tente novamente.';
          }

          toast.error(errorMessage);
        }
      }
    },

    logout: async () => {
      try {
        await signOut(auth);
        updateUserState(null);

        toast.success('Logout realizado com sucesso!');
        window.location.href = '/';
      } catch (error: string) {
        console.error('Erro ao fazer logout:', error.message);
        toast.error('Erro ao fazer logout: ' + error.message);
      }
    },

    initializeAuthState
  };
});

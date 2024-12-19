'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const useAuthGuard = () => {
  const router = useRouter();
  const { user, initializeAuthState } = useAuthStore();

  useEffect(() => {
    initializeAuthState(); // aqui eu uso a funcao que fiz para inicializar o estado do auth la na authStore

    if (user) {
      router.push('/'); // Redireciona para a página inicial caso ele não esteja logado
    }

    if (!user) {
      router.push('/'); // Redireciona para a página inicial caso ele não esteja logado
    }
  }, [user, initializeAuthState, router]);

  return null;
};

export default useAuthGuard;

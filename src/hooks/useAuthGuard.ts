'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const useAuthGuard = () => {
  const router = useRouter();
  const { user, initializeAuthState } = useAuthStore();

  useEffect(() => {
    initializeAuthState();
    if (!user) {
      router.push('/'); // Redireciona para a página inicial
    }
  }, [user, initializeAuthState, router]);

  return null;
};

export default useAuthGuard;

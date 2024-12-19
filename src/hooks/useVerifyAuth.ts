// hooks/useAuthRedirect.ts
'use client';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/authStore'; // Ou onde você gerencia o estado de autenticação
import { useRouter } from 'next/navigation';

const useVerifyAuth = () => {
  const router = useRouter();
  const { initializeAuthState } = useAuthStore();

  useEffect(() => {
    initializeAuthState();
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/'); // Se não tiver user no localStorage, redireciona para a página de login
    }
  }, [initializeAuthState, router]);
};

export default useVerifyAuth;

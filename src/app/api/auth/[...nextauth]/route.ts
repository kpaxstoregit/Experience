// app/api/auth/[...nextauth]/route.ts

import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          // Usando o Firebase para autenticar
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );

          // Aqui você pode personalizar o que retorna, por exemplo, você pode pegar mais dados do usuário
          const user = userCredential.user;

          return {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            image: user.photoURL
          };
        } catch (error) {
          console.error(error);
          return null; // Retorna null se a autenticação falhar
        }
      },
      session: {
        strategy: 'jwt'
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: '/auth/signin' // Página de login customizada
      }
    })
  ]
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

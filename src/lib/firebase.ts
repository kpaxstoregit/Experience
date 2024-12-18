'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Para autenticação
import { getFirestore } from 'firebase/firestore'; // Para Firestore
import { getStorage } from 'firebase/storage'; // Para Storage

// Usando Record para definir um objeto de configuração com chaves e valores do tipo string
type FirebaseConfig = Record<string, string>;

// const firebaseConfig: FirebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID'
// };

const firebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyC81GyQ6XYBzL66c9xGFolRKydpHK7LNW4',
  authDomain: 'gerenciador-pessoal-6ea59.firebaseapp.com',
  projectId: 'gerenciador-pessoal-6ea59',
  storageBucket: 'gerenciador-pessoal-6ea59.firebasestorage.app',
  messagingSenderId: '445273907865',
  appId: '1:445273907865:web:348e9d43b16b81e24e4e08',
  measurementId: 'G-LQPTZPM81D'
};

// Inicializa o app apenas se ainda não estiver inicializado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

console.log('Firebase inicializado com sucesso:', app.name);

export const auth = getAuth(app); // Exporta o serviço de autenticação
export const db = getFirestore(app); // Exporta o Firestore
export const storage = getStorage(app); // Exporta o Storage

import { db } from '@/lib/firebase'; // Arquivo de configuração do Firebase
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs
} from 'firebase/firestore';
import useSWR, { preload } from 'swr'; // SWR para cache e validação

export const useApi = (collectionName: string) => {
  // Função para adicionar dados no Firebase (POST)
  const post = async <T = any>(
    collectionName: string,
    body: Record<string, any>
  ) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), body);
      return { id: docRef.id, ...body }; // Retorna o dado adicionado
    } catch (err) {
      throw err; // Lançando o erro para captura futura
    }
  };

  // Função para buscar dados do Firebase (GET)
  const get = async <T = any>(collectionName: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const fetchedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      return fetchedData; // Retorna os dados da coleção
    } catch (err) {
      throw err; // Lançando o erro para captura futura
    }
  };

  // Função para deletar dados do Firebase (DELETE)
  const del = async <T = any>(collectionName: string, id: string) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      return id; // Retorna o id da tarefa deletada
    } catch (err) {
      throw err; // Lançando o erro para captura futura
    }
  };

  // Usando o preload apenas quando o hook for invocado
  preload(collectionName, () => get(collectionName));

  // Usando SWR diretamente com a função `get` para buscar dados da coleção dinâmica
  const {
    data,
    error,
    isValidating: loading
  } = useSWR(
    collectionName, // A chave para o SWR agora é a coleção dinâmica

    () => get(collectionName), // Passa a coleção dinâmica para a função get
    {
      revalidateOnFocus: false, // Desativa a revalidação ao focar na página
      revalidateOnReconnect: false // Desativa a revalidação ao reconectar à internet
    }
  );

  return {
    data,
    error,
    loading, // Variável que indica se os dados estão sendo carregados
    post,
    get,
    del
  };
};

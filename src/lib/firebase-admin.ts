import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Configuração do Firebase diretamente no código
const serviceAccount = {
  type: 'service_account',
  project_id: 'gerenciador-pessoal-6ea59',
  private_key_id: '5e66e7a4ee8bc7f3937e01bd3999af7d7aa08804',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2TIcBySOZSkr4\nE87fOEmH4De8EU27ZwqT32pQKumoPENMkD0HfttgfIOI3YHUIZsV1j1BhXjiepzE\niwi+2J9E43lp7C1VgPRYoISP1kMaINUBpbtpf3NcsILDBmz3Cx71KyIxXHZ0oYrN\nuft6A3z2UpPWWJo0MZeiVh3c+ScJTk+NUYTjC74irTXohLpaJcW/tmBrdmipmJne\nXKy0widlqlE7+XgDArEbvjXRe0ZmA76RzSgYTpq1c6UNytczvTSz103uXagNYd6e\nReoTSlHU/fjZbqVxdz76QyStvMB6CpzFpfAOXwjIgavlkthQayCkAIeLAThTHy0r\nmY8rRXA1AgMBAAECggEAAkriacHV9PALvaSWIJWByzfPy57WFj9nUSZpR6/PzMH7\n61hnBBNIKVBM4SmT9TnPoaMrlbQwKdJL6rwq3yeJ5+EKc6wOLTntbg3lYjUEwVfc\nsI7H1WhOaEHUqyTctZtKB4ru0lBs3EOfI2jYLO0iowBf2T1iVw9b7k/cmUei14mY\npIOFEcoFIXepaYMwDuf22iwMyON/8wy3R6OikrN3LXnmc62NEikdMwNCXjpA89c3\niNEqgHiwAAKV9lSbxY4ShtZ4guqMuxCFyytgfuLwo791MC6NHUgNkbOc6P0YBRxL\ntprmgyl4DV42ies+zfOdOm07C7R/OGjdei/Hy3Zw0QKBgQDZf0u64Essq9z9ySMP\n5fD/Khkvkb24aexjyj+8tybXFQNW1/te8R/R1PSN+juBnMEppKFBN4bJLiLGJNxY\neAvr6uaM3AsvYQV9tvNv6f5HVvbhhi7ZW7N0RqW1q3UqGfVbJwx7UiELF0J8LDMH\nKMKyFZ6CRS2ZRar5v2IFzOGlLQKBgQDWkhZ8GvPYSePgk/yxhGcrsxnquM+sMgGH\nTE8xAyJQfQvY7Fo416PPCIWdpXX3mC6IssPZh9VkFAzn8ZtfkacCMwRRcKCLvZ/7\nUvMeSs/WgliYmhlYEeHCzir9CGMgRwg2n5l4poE5iWfNefjUdXDhDrtvXkzjeBKM\nCTSXbR9sKQKBgDvQFRx8aFANp4WnldveaYtSoYCCfQFFJ/w9d4/Hcof9wGBWn0t5\n1j1XajXNViYL3Nc97hbIVWnoJSoGow41XVnwzJx6Ox05elAbSxFA8WvfD5/vzdx6\nqnxUnWe7kkoUv3Pk5jrX2Dx7lg4d/Z5/aCOfbGr46VRYY2+xYRylPny1AoGBAIE+\nH2MDjQsjfqoAGX4HhWlSCPNT/Gr49+i58x1PiPS4TVGNE88XPGjw9iJ9zm+jb6wR\nGVzGr6cHWLrA0difz9vIRPqU/28MefeVADGn2EaZ3qmUcF2W78g6DLS6v5Jqlqzo\nNzXv/PheJnMi29mFH8e/6vBq+Z8t7OYCiXYIWZv5AoGBAIdCJ3cny39dO8j+bpQu\n2jWKrTeyJMifKeDNN2wVAtKS/hrV7QNKdMrnU+zQQILMfx+z1/3jrcs+ITHMVX0k\nQ35v8WMuhZsLckQb/wq4B7kIlyuB9bhOPw45OzosYnEhSbeEQ/4fmJ81tUceVSfN\nyLFEf/Ne2djn03aBoIEb49FI\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-n1up0@gerenciador-pessoal-6ea59.iam.gserviceaccount.com',
  client_id: '116094374561953803034',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n1up0%40gerenciador-pessoal-6ea59.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com'
};
const app = initializeApp({
  credential: cert(serviceAccount),
  projectId: 'gerenciador-pessoal-6ea59'
});

const db = getFirestore(app);

export { db };

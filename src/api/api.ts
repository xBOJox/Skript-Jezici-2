import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://raf-pixeldraw.aarsen.me/api',
});

export async function login(username: string, password: string) {
  try {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { code, extra } = error.response.data;
      console.error(`Error code: ${code}`);
      if (extra) {
        console.error(`Extra: ${JSON.stringify(extra)}`);
      }
    } else {
      console.error('Unknown error');
    }
    throw error;
  }
}

export async function register(username: string, password: string) {
  try {
    const response = await api.post('/auth/register', {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { code, extra } = error.response.data;
      console.error(`Error code: ${code}`);
      if (extra) {
        console.error(`Extra: ${JSON.stringify(extra)}`);
      }
    } else {
      console.error('Unknown error');
    }
    throw error;
  }
}

export default api;
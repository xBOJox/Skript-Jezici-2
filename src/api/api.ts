import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://raf-pixeldraw.aarsen.me/api',
});

// Add interceptor to include the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

type LoginReq = {
  username: string;
  password: string;
}

type LoginRes = {
  failed: boolean,
  token: string,
  user_id: string,
  username: string,
}
type SaveDrawingReq = {
  name: string;
  canvas: string[][];
};

type SaveDrawingRes = {
  id: string;
  name: string;
};

type LoadDrawingRes = {
  id: string;
  name: string;
  canvas: string[][];
  author: string;
};

export async function saveDrawing(request: SaveDrawingReq, token: string): Promise<SaveDrawingRes> {
  try {
    const response = await api.post('/pictures', request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function loadDrawings({ limit = 10, page = 1, older_first = false }): Promise<LoadDrawingRes[]> {
  try {
    const response = await api.get('/pictures', {
      params: {
        limit,
        page,
        older_first,
      },
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


export async function login(request: LoginReq) : Promise<LoginRes> {
  try {
    const response = await api.post('/auth/login', request);
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
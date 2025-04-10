import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, 
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (
      error.response?.status === 403 &&
      error.response?.data?.error === 'Usuario baneado'
    ) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login?banned=true';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

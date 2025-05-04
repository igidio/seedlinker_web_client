import axios from 'axios'
import { get_cookie } from '@/utils/cookie.ts'

export const api_client = axios.create({
  baseURL: '/api',
})
api_client.interceptors.request.use(
  config => {
    const token = get_cookie('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
)

import axios from 'axios'
import { get_cookie, remove_cookie, set_cookie } from '@/utils/cookie.ts'

export const api_client = axios.create({
  baseURL: '/api',
})
api_client.interceptors.request.use((config) => {
  const token = get_cookie('access_token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})
api_client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      console.log('Token expired, trying to refresh it...')
      remove_cookie('access_token')
      const refresh_token = get_cookie('refresh_token')
      if (refresh_token) {
        try {
          const response = await axios.post('/api/service/auth/refresh', { refresh_token })
          const new_token = response.data.access_token
          set_cookie('access_token', new_token)
          error.config.headers.Authorization = `Bearer ${new_token}`
          return api_client(error.config)
        } catch (error) {
          console.error('Error refreshing token:', error)
          remove_cookie('access_token')
          return Promise.reject(error)
        }
      }
    }
  },
)

import axios from 'axios'
import { config } from '../config'
import { getToken } from '../utils'
import { deleteLocalStorageValue } from '../hooks/useLocalStorage'

const api = axios.create()

api.interceptors.request.use(
  async (request: any) => {
    const baseURL = config.API_BASE_URL || ''
    const token = getToken()
    request.url = baseURL + request.url
    console.log('base url: ', baseURL);
    if (!!token) {
      request.headers = {
        Authorization: `Bearer ${token}`,
        Accept: '*/*',
      }
    }

    return request
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  response => response,
  error => {
    console.log('error: ', error);
    if (error && error.response && error.response.status === 401) {
      console.log('401')
      deleteLocalStorageValue('token')
      document.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api

import axios from 'axios'

const BASE_URL = 'http://localhost:3333'

export const axiosInstance = axios.create({
  baseURL: BASE_URL
})

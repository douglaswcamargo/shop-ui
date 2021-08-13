import axios from 'axios'

const baseURL = process.env.VUE_APP_API_URL ?? 'http://localhost:3333'

export const axiosInstance = axios.create({
  baseURL
})

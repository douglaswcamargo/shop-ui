import { axiosInstance } from '@/helpers/apiHelper'
import { OrderPayload } from '@/types'

export const getProducts = () => axiosInstance.get('/items')
export const getCategories = () => axiosInstance.get('/categories')
export const postCreateOrder = (order: OrderPayload) => axiosInstance.post('/orders', { ...order })

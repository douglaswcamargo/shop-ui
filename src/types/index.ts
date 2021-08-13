/* eslint-disable camelcase */
export interface Product {
  id: number
  category_id: number
  name: string
  image_id: string
  price: number
}

export interface SelectedProduct extends Product {
  item_id: number
  total: number
}

export interface Categories {
  id: number
  createdAt: string
  image_id: string
  name: string
  Items: Product[]
  updatedAt: string
}

export interface PaymentInformation {
  name: string
  email: string
  cardNumber: string | number
  cvv: string | number
  expiration: string | number
}

export interface OrderPayload {
  email: string
  name: string
  payment: {
    name: string
    card_number: string | number
    cvv: string | number
    expiration: string | number
  }
  items: { item_id: number; total: number; }[]
}

export interface PaymentFormError {
  [key: string]: { hasError: boolean, message: string }
}

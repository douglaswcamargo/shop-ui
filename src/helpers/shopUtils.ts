import { SelectedProduct, Categories, PaymentInformation, OrderPayload, PaymentFormError } from '@/types'
import { CURRENCY_US, LOCALE_US } from '@/constants'

export const filterProductsByString = (products: Categories[], searchString: string): Categories[] => {
  const filteredProducts = products.reduce((acc: Categories[], product: Categories) => {
    const filteredItems = product.Items?.filter(
      (item) => item.name.toLowerCase().includes(searchString.toLowerCase())
    )
    if (filteredItems.length > 0) {
      return [...acc, { ...product, Items: filteredItems }]
    }
    return acc
  }, [])

  return filteredProducts
}

export const getFormattedPrice = (
  price: number,
  currency: string = CURRENCY_US,
  locale: string = LOCALE_US
): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
}

export const getOrderPayload = (formValues: PaymentInformation, cart: SelectedProduct[]): OrderPayload => {
  const {
    name,
    email,
    cardNumber,
    cvv,
    expiration
  } = formValues
  const items = cart.map(item => {
    return {
      item_id: item.id,
      total: item.total
    }
  })
  return { name, email, payment: { name, card_number: cardNumber, cvv, expiration }, items }
}

export const getFormattedOrderNumber = (orderId: number): string => `#${String(orderId).padStart(6, '0')}`

export const getRequiredPaymentFormValidation = (formValues: PaymentInformation) => {
  const validatedFields = Object.keys(formValues).reduce((acc: PaymentFormError, key: string) => {
    const hasError = formValues[key as keyof PaymentInformation] === ''
    return { ...acc, [key]: { hasError, message: 'Required field' } }
  }, {})

  const errorArray = Object.values(validatedFields).filter((value) => value.hasError)

  return { validatedFields, errorArray }
}

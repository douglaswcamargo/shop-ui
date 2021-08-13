import {
  SelectedProduct,
  Categories,
  PaymentInformation,
  OrderPayload,
  PaymentFormError
} from '@/types'
import { CURRENCY_US, LOCALE_US } from '@/constants'

/**
 * Filters a list of products by a given string.
 *
 * @param  {Categories[]} products
 * @param  {string} searchString
 * @returns Categories
 */
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

/**
 * Formats number to locale currency.
 *
 * @param  {number} price
 * @param  {string=CURRENCY_US} currency
 * @param  {string=LOCALE_US} locale
 * @returns string
 */
export const getFormattedPrice = (
  price: number,
  currency: string = CURRENCY_US,
  locale: string = LOCALE_US
): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price)
}

/**
 * Builds the payload to create a new order.
 *
 * @param  {PaymentInformation} formValues
 * @param  {SelectedProduct[]} cart
 * @returns OrderPayload
 */
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

/**
 * @param  {number} orderId
 * @returns string
 */
export const getFormattedOrderNumber = (orderId: number): string => `#${String(orderId).padStart(6, '0')}`

/**
 * Validates the payment form values and returns a list of errors along with the form values.
 *
 * @param  {PaymentInformation} formValues
 */
export const getRequiredPaymentFormValidation = (formValues: PaymentInformation) => {
  const validatedFields = Object.keys(formValues).reduce((acc: PaymentFormError, key: string) => {
    const hasError = formValues[key as keyof PaymentInformation] === ''
    return { ...acc, [key]: { hasError, message: 'Required field' } }
  }, {})

  const errorArray = Object.values(validatedFields).filter((value) => value.hasError)

  return { validatedFields, errorArray }
}

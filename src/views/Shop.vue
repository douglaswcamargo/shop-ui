<template>
  <div class="shop">
    <div class="shop__header">
      <div class="shop__header__left">
        <h1 class="shop__header__title">Shop</h1>
      </div>
      <div class="shop__header_center">
        <FilterSelect :data="filteredProducts" :onChange="scrollToCategory" />
        <SearchInput :onKeyUp="handleSearch" />
      </div>
      <OverlaySideMenu :count="totalItems">
        <PaymentForm
          v-if="totalItems > 0"
          :onSubmit="handleSubmit"
          :isSubmitSuccess="isSubmitSuccess"
          :orderId="orderCreatedId"
        />
        <Cart
          v-if="!isSubmitSuccess"
          :cart="cart"
        />
      </OverlaySideMenu>
    </div>
    <div class="shop__body">
      <ProductList
        :products="filteredProducts"
        :onChange="handleCartChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import { getProducts, postCreateOrder } from '@/services/products'
import { filterProductsByString, getOrderPayload } from '@/helpers/shopUtils'
import { SelectedProduct, Categories, PaymentInformation } from '@/types'

import Cart from '@/components/Cart.vue'
import FilterSelect from '@/components/FilterSelect.vue'
import ProductList from '@/components/ProductList.vue'
import OverlaySideMenu from '@/components/OverlaySideMenu.vue'
import PaymentForm from '@/components/PaymentForm.vue'
import SearchInput from '@/components/SearchInput.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Cart,
    FilterSelect,
    OverlaySideMenu,
    PaymentForm,
    ProductList,
    SearchInput
  },
  setup () {
    const cart = ref<SelectedProduct[]>([])
    const displayCart = ref<boolean>(false)
    const filteredProducts = ref<Categories[]>([])
    const isSubmitSuccess = ref<boolean>(false)
    const orderCreatedId = ref(0)
    const products = ref<Categories[]>([])
    const totalItems = ref<number>(0)
    /* eslint-disable-next-line */
    const toast: any = inject('$toast')

    const getTotalItems = () => {
      return cart.value.reduce((acc, item) => {
        const { total } = item
        return acc + total
      }, 0)
    }

    const handleSearch = (queryString: string) => {
      const newProducts = filterProductsByString(products.value, queryString)

      filteredProducts.value = queryString ? newProducts : products.value
    }

    onMounted(async () => {
      try {
        const response = await getProducts()
        const { data } = response

        products.value = data
        filteredProducts.value = data
      } catch (error) {
        toast.error(error.message)
      }
    })

    const handleCartChange = (selectedProducts: SelectedProduct[]) => {
      cart.value = selectedProducts
      totalItems.value = getTotalItems()
    }

    const scrollToCategory = (id: number | string) => {
      const element = document.getElementById(`category_${id}`)
      const yOffset = -100
      const y = element ? element.getBoundingClientRect().top + window.pageYOffset + yOffset : 0

      window.scrollTo({ top: y, behavior: 'smooth' })
    }

    const handleSubmit = async (values: PaymentInformation) => {
      try {
        const orderPayload = getOrderPayload(values, cart.value)
        const orderResponse = await postCreateOrder(orderPayload)
        const { id } = orderResponse.data

        toast.success('Order created.')
        isSubmitSuccess.value = true
        orderCreatedId.value = id
      } catch (error) {
        toast.error(error.message)
      }
    }

    return {
      cart,
      displayCart,
      filteredProducts,
      handleCartChange,
      isSubmitSuccess,
      handleSubmit,
      handleSearch,
      orderCreatedId,
      products,
      scrollToCategory,
      totalItems
    }
  }
})
</script>

<style scoped>
  .shop {
    width: 100%;
  }

  .shop__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 3.8rem;
    background-color: #f7f7f7;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    position: fixed;
    color: #475569;
  }

  .shop__header__left {
    display: flex;
  }

  .shop__header_center {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  .shop__header__title {
    font-size: 1.7rem;
    text-align: left;
    margin-right: 2rem;
  }

 .shop__body {
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 6.8rem 2.8rem 0 2.8rem;
 }

 @media screen and (max-width: 767px) {
  .shop__header__title {
    display: none;
  }
 }
</style>

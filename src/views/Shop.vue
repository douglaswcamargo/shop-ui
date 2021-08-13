<template>
  <div class="shop">
    <div class="shop__header">
      <div class="shop__header__left">
        <h1 class="shop__header__title">Shop</h1>
      </div>
      <div class="shop__header_center">
        <select
          class="shop__header__filter"
          @change="scrollToCategory"
        >
          <option
            v-for="category in filteredProducts"
            :value="category.id"
            :key="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <div class="shop__header__search">
        <font-awesome-icon
          icon="search"
          class="fa-2x shop__header__search__icon"
        />
        <input
          type="text"
          placeholder="Search products..."
          @keyup="handleSearch"
        />
      </div>
      </div>
      <OverlaySideMenu :count="totalItems">
        <PaymentForm
          v-if="totalItems > 0"
          :onSubmit="handleSubmit"
          :isSubmitSuccess="isSubmitSuccess"
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
import { defineComponent, ref, onMounted } from 'vue'
import ProductList from '@/components/ProductList.vue'
import Cart from '@/components/Cart.vue'
import { SelectedProduct, Categories, PaymentInformation } from '@/types'
import { getProducts, postCreateOrder } from '@/services/products'
import OverlaySideMenu from '@/components/OverlaySideMenu.vue'
import PaymentForm from '@/components/PaymentForm.vue'
import { filterProductsByString, getOrderPayload } from '@/helpers/shopUtils'

export default defineComponent({
  name: 'Home',
  components: {
    ProductList,
    Cart,
    OverlaySideMenu,
    PaymentForm
  },
  setup () {
    const cart = ref<SelectedProduct[]>([])
    const products = ref<Categories[]>([])
    const filteredProducts = ref<Categories[]>([])
    const displayCart = ref<boolean>(false)
    const totalItems = ref<number>(0)
    const isSubmitSuccess = ref<boolean>(false)

    const getTotalItems = () => {
      return cart.value.reduce((acc, item) => {
        const { total } = item
        return acc + total
      }, 0)
    }

    const handleSearch = (event: Event) => {
      const e = (event?.target as HTMLInputElement)
      const queryString: string = e.value ?? ''
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
        console.log(error)
      }
    })

    const handleCartChange = (selectedProducts: SelectedProduct[]) => {
      cart.value = selectedProducts
      totalItems.value = getTotalItems()
    }

    const scrollToCategory = (event: Event) => {
      const e = (event?.target as HTMLInputElement)
      const categoryId: string = e.value ?? ''
      const element = document.getElementById(`category_${categoryId}`)
      const yOffset = -100
      const y = element ? element.getBoundingClientRect().top + window.pageYOffset + yOffset : 0

      window.scrollTo({ top: y, behavior: 'smooth' })
    }

    const handleSubmit = async (values: PaymentInformation) => {
      try {
        const orderPayload = getOrderPayload(values, cart.value)
        const response = await postCreateOrder(orderPayload)
        console.log(response)
        isSubmitSuccess.value = true
      } catch (error) {
        console.log(error)
      }
    }

    return {
      cart,
      displayCart,
      filteredProducts,
      handleCartChange,
      isSubmitSuccess,
      totalItems,
      handleSubmit,
      handleSearch,
      products,
      scrollToCategory
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

  .shop__header__search input,
  .shop__header__filter {
    padding: 1rem;
    margin-right: 2rem;
    background-color: white;
    border-radius: 0.5rem;
  }

  .shop__header__search {
    display: flex;
    align-items: center;
  }

  .shop__header__search__icon {
    margin-right: 0.5rem;
    color: #dcdcdc  ;
  }

 .shop__body {
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 6.8rem 2.8rem 0 2.8rem;
 }

 @media screen and (max-width: 767px) {
  .shop__header__title,
  .shop__header__search {
    display: none;
  }
  .shop__header__filter {
    width: 10rem;
  }
 }
</style>

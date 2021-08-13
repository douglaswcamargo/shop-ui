<template>
  <div class="cart">
    <ul>
      <li
        v-for="item in cart"
        :key="item.id"
        class="cart__item"
      >
      <span class="cart__item__name">
        <div class="cart__item__image">
          <img
            :src="require(`@/assets/img/${item.image_id}.jpg`)"
            :alt="`${item.name} image`"
          />
        </div>
        {{ item.name }}
      </span>
      <span class="cart__item__total">x {{ item.total }}</span>
      <span class="cart__item__cost">{{ getFormattedPrice(item.total * item.price) }}</span>
      </li>
      <li class="cart__item total" v-if="totalDue > 0">
        <span class="cart__item__name">TOTAL</span>
        <span></span>
        <span class="cart__item__due">{{ totalDueFormatted }}</span>
      </li>
    </ul>
    <div class="cart__item" v-if="totalDue === 0">
      Your cart is empty.
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { getFormattedPrice } from '@/helpers/shopUtils'
import { SelectedProduct } from '@/types'

export default defineComponent({
  name: 'Cart',
  props: {
    cart: {
      type: Array as PropType<SelectedProduct[]>,
      default: () => []
    }
  },
  setup (props) {
    const totalDue = computed(() => getCartTotal())
    const totalDueFormatted = computed(() => getFormattedPrice(getCartTotal()))

    const getCartTotal = () => {
      const price = props.cart.reduce((acc, item) => {
        const { price, total } = item
        return acc + (total * price)
      }, 0)
      return price
    }

    return { totalDue, totalDueFormatted, getFormattedPrice }
  }
})
</script>

<style scoped>
 .cart {
   width: 100%;
   max-width: 32rem;
   padding: 2rem;
 }

 .cart ul {
   list-style-type: none;
   margin: 0;
   padding: 0;
   display: grid;
   grid-template-columns: repeat(3, auto);
 }

 .cart__item {
  display: contents;
  list-style: none;
  margin: 0;
  padding: 1rem;
 }

 .cart__item:not(.total) span {
  border-bottom: 1pt solid lightgray;
  padding: 0.5rem;
 }

 .cart__item.total {
   border-bottom: none;
 }
 .cart__item__name {
   font-size: 1.2rem;
   display: flex;
 }
 .cart__item__image img {
   height: 2rem;
   width: 2rem;
   border-radius: 50%;
   margin-right: 0.5rem;
   box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
 }
 .cart__item__total {
   text-align: center;
   color: #A3A3A3;
 }
 .cart__item.total span {
   padding-top: 1rem;
 }
 .cart__item__cost {
   text-align: right;
 }
 .cart__item__due {
   font-weight: bold;
   text-align: right;
 }
</style>

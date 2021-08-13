<template>
  <div class="categories">
    <div class="categories__list" v-if="hasNoData">
      <h3>No products found</h3>
    </div>
    <div class="categories__list" v-for="product in productList" :key="product.id">
      <h1
        :id="`category_${product.id}`"
        class="categories__list__title"
      >
        <div class="categories__list__image">
          <img
            :src="require(`@/assets/img/${product.image_id}.jpg`)"
            :alt="`${product.name} image`"
          />
        </div>
        {{ product.name }}
      </h1>
        <div class="categories__list__items">
          <ProductCard
            v-for="item in product.Items"
            :key="item.id"
            :product="item"
            :onAdd="onAdd"
            :onRemove="onRemove"
          />
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { SelectedProduct, Categories } from '@/types'

export default defineComponent({
  name: 'ProductList',
  props: {
    products: {
      type: Object as PropType<Categories[]>,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  components: {
    ProductCard
  },
  setup (props) {
    const selectedProducts = ref<SelectedProduct[]>([])
    const productList = computed(() => {
      return props.products
    })
    const hasNoData = computed(() => {
      return props.products.length === 0
    })

    const onAdd = (product: SelectedProduct) => {
      updateSelectedProducts(product)
    }

    const onRemove = (product: SelectedProduct) => {
      updateSelectedProducts(product)
    }

    const updateSelectedProducts = (product: SelectedProduct) => {
      const filteredProducts = selectedProducts.value.filter(value => value.item_id !== product.item_id)
      const updatedProduct = product.total > 0 ? [product] : []

      selectedProducts.value = [...filteredProducts, ...(updatedProduct)]
      props.onChange(selectedProducts.value)
    }

    return { productList, hasNoData, onAdd, onRemove }
  }
})
</script>

<style scoped>
  .categories {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 72rem;
  }

  .categories__list {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .categories__list__items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
    grid-gap: 16px;
  }

  .categories__list__title {
    display: flex;
    align-items: center;
    color: #3e3e3e;
    margin-top: 3rem;
    font-size: 2.8rem;
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .categories__list__image img {
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 4px;
    pointer-events: none;
    align-self: flex-start;
    border-radius: 50%;
    margin-right: 2rem;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  }
</style>

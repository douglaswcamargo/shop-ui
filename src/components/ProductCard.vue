<template>
<div :class="{'product-card': true, 'selected': total > 0}">
  <div class="product-card__image">
    <img
      :src="require(`@/assets/img/${product.image_id}.jpg`)"
      :alt="`${product.name} image`"
    />
  </div>
  <div class="product-card__body">
    <div class="description">
      <h2 class="title">
        {{ product.name }}
      </h2>
      <div class="price">
        {{ getFormattedPrice(product.price) }}
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__footer_buttons">
        <button class="button" @click="handleRemove" type="button">
          <font-awesome-icon
            icon="minus"
          />
        </button>
        <div class="total">{{ total }}</div>
        <button class="button" @click="handleAdd" type="button">
          <font-awesome-icon
            icon="plus"
          />
        </button>
      </div>
      <button class="button cancel" @click="handleRemoveAll" type="button">
        <font-awesome-icon
          icon="trash"
        />
      </button>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getFormattedPrice } from '@/helpers/shopUtils'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    onAdd: {
      type: Function,
      required: true
    },
    onRemove: {
      type: Function,
      required: true
    }
  },
  setup (props) {
    const total = ref(0)

    const handleAdd = () => {
      const newTotal = total.value + 1
      total.value = newTotal
      props.onAdd({ ...props.product, item_id: props.product.id, total: newTotal })
    }

    const handleRemove = () => {
      if (total.value > 0) {
        const newTotal = total.value - 1
        total.value = newTotal
        props.onRemove({ ...props.product, item_id: props.product.id, total: newTotal })
      }
    }

    const handleRemoveAll = () => {
      if (total.value > 0) {
        total.value = 0
        props.onRemove({ ...props.product, item_id: props.product.id, total: 0 })
      }
    }

    return { total, handleAdd, handleRemove, handleRemoveAll, getFormattedPrice }
  }
})
</script>
<style scoped>
  .product-card {
    display: flex;
    width: 32rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border: 1px solid transparent;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    padding: 1rem;
    margin-right: 2rem;
  }

  .product-card:not(.selected):hover {
    border: 1px solid #dbdad9;
  }

  .product-card.selected {
    border: 1px solid #22C55E;
  }

  .product-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 0.7rem 0.7rem 0.7rem;
  }

  .product-card__body .description {
    display: flex;
    width: 100%;
  }

  .product-card__body .description .title {
    flex: 1;
    color: #3e3e3e;
    font-size: 1.2rem;
    font-weight: 400;
  }

  .product-card__body .description .price {
    font-size: 1.25rem;
    color: green;
  }

  .product-card__image img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    border-radius: 4px;
    pointer-events: none;
    align-self: flex-start;
  }

  .product-card__footer {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .product-card__footer_buttons {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .product-card__footer .button {
    display: flex;
    color: #636262;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 2rem;
    height: 2rem;
    padding: 8px;
    border: 1px solid #dbdad9;
    border-radius: 2px;
  }

  .product-card__footer .button.cancel {
    border: none;
    color: #b9b8b7;
    min-width: 2rem;
  }

  .product-card__footer .total {
    text-align: center;
    font-size: 1.2rem;
    min-width: 2rem;
  }
</style>

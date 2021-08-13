<template>
  <button
    :class="{ 'cart-button': true, 'hasBadge': count > 0 }"
    :data-count="count"
    @click="handleClick"
  >
    <font-awesome-icon
      icon="shopping-basket"
      class="fa-2x"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'CartButton',
  props: {
    count: {
      type: Number,
      default: 0
    },
    onClick: {
      type: Function,
      default: () => null
    }
  },
  setup (props) {
    const handleClick = computed(() => props.onClick())
    return { handleClick }
  }
})
</script>

<style scoped>
  .cart-button[data-count]{
      position: relative;
      color: #475569
  }
  .cart-button.hasBadge[data-count]:after{
    position: absolute;
    right: -0.75em;
    top: -.75em;
    content: attr(data-count);
    padding: .4em;
    border-radius: 10em;
    line-height: 1em;
    color: white;
    background: #04AA6D;
    text-align: center;
    min-width: 2em;
    font: bold .6em sans-serif;
  }
</style>

<template>
  <CartButton
    :onClick="handleMenuClick"
    :count="count"
  />
  <transition name="slide">
    <div v-if="isOpen" class="overlay">
      <button class="overlay__closebtn" @click="handleMenuClick" >&times;</button>
      <div class="overlay__content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import CartButton from '@/components/CartButton.vue'

export default defineComponent({
  name: 'OverlaySideMenu',
  components: {
    CartButton
  },
  props: {
    count: {
      type: Number,
      required: false,
      default: 0
    }
  },
  setup () {
    const isOpen = ref(false)
    const handleMenuClick = () => {
      isOpen.value = !isOpen.value
    }

    return { isOpen, handleMenuClick }
  }
})
</script>
<style scoped>
  .overlay {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    background-color: white;
    overflow-x: hidden;
    opacity: 1
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: width 0.3s ease;
    transition: opacity 0.2s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    width: 0;
    opacity: 0;
  }

  .overlay__content {
    top: 10%;
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    height: 500px;
    flex-wrap: wrap;
  }

  .overlay a {
    padding: 8px;
    text-decoration: none;
    font-size: 36px;
    color: #818181;
    display: block;
  }

  .overlay__closebtn {
    position: absolute;
    top: 0;
    right: 45px;
    font-size: 60px;
  }
</style>

<template>
  <div class="search-input">
    <font-awesome-icon
      icon="search"
      class="fa-2x search-input__icon"
    />
    <input
      type="text"
      :placeholder="placeHolder"
      @keyup="handleOnKeyUp"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SearchInput',
  props: {
    data: {
      type: Object,
      required: true
    },
    placeHolder: {
      type: String,
      default: 'Search products...'
    },
    onKeyUp: {
      type: Function,
      default: () => null
    }
  },
  setup (props) {
    const handleOnKeyUp = (event: Event) => {
      const e = (event?.target as HTMLInputElement)
      const value: string = e.value ?? ''
      props.onKeyUp(value)
    }

    return { handleOnKeyUp }
  }
})
</script>

<style scoped>

  .search-input input{
    padding: 1rem;
    margin-right: 2rem;
    background-color: white;
    border-radius: 0.5rem;
  }

  .search-input {
    display: flex;
    align-items: center;
  }

  .search-input__icon {
    margin-right: 0.5rem;
    color: #dcdcdc  ;
  }

  @media screen and (max-width: 767px) {
    .search-input {
      display: none;
    }
  }
</style>

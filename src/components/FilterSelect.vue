<template>
  <select
    class="select-filter"
    @change="handleOnChange"
  >
    <option
      v-for="option in filterOptions"
      :value="option.id"
      :key="option.id"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'

export default defineComponent({
  name: 'FilterSelect',
  props: {
    data: {
      type: Object,
      required: true
    },
    onChange: {
      type: Function,
      default: () => null
    }
  },
  setup (props) {
    const handleOnChange = (event: Event) => {
      const e = (event?.target as HTMLInputElement)
      const value: string = e.value ?? ''
      props.onChange(value)
    }

    const filterOptions = ref(props.data)

    watch(() => props.data, (newValue) => {
      filterOptions.value = newValue
    })

    return { handleOnChange, filterOptions }
  }
})
</script>

<style scoped>
  .select-filter {
      padding: 1rem;
      margin-right: 2rem;
      background-color: white;
      border-radius: 0.5rem;
    }
  @media screen and (max-width: 767px) {
    .select-filter {
      width: 12rem;
    }
  }
</style>

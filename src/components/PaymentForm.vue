<template>
  <div class="payment__container">
    <form class="payment-form" id="paymentForm" @submit.prevent="handleSubmit">
      <div class="payment" v-if="!isSuccess">
        <div class="payment__field">
            <label for="name">Name</label>
            <input v-model="state.name" type="text">
            <small class="error" v-if="errors.name.hasError">{{ errors.name.message }}</small>
        </div>
        <div class="payment__field">
            <label for="email">Email</label>
            <input v-model="state.email" type="email">
            <small class="error" v-if="errors.email.hasError">{{ errors.email.message }}</small>
        </div>
        <div class="payment__field">
            <label for="cardNumber">Card Number</label>
            <input v-model="state.cardNumber" type="text" pattern="[0-9]*" inputmode="numeric">
            <small class="error" v-if="errors.cardNumber.hasError">{{ errors.cardNumber.message }}</small>
        </div>
        <div class="payment__field">
            <label for="expirationdate">Expiration (MMYY)</label>
            <input v-model="state.expiration" type="text" pattern="[0-9]*" inputmode="numeric">
            <small class="error" v-if="errors.expiration.hasError">{{ errors.expiration.message }}</small>
        </div>
        <div class="payment__field">
            <label for="cvv">Security Code</label>
            <input v-model="state.cvv" type="text" pattern="[0-9]*" inputmode="numeric">
            <small class="error" v-if="errors.cvv.hasError">{{ errors.cvv.message }}</small>
        </div>
      </div>
      <button
        class="cart__button"
        type="submit"
        v-if="!isSubmitSuccess"
      >
        Confirm order
      </button>
    </form>
  <div class="payment__success" v-if="isSuccess">
    <p class="payment__success__order">
      {{ `Order ${formattedOrderId}`}}
    </p>
    <p class="payment__success__message">Thank you!</p>
  </div>
  <button
    class="cart__button return"
    v-if="isSubmitSuccess"
    @click="reloadPage"
  >
    Return to shop
  </button>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { PaymentFormError } from '@/types'
import { getFormattedOrderNumber, getRequiredPaymentFormValidation } from '@/helpers/shopUtils'

export default defineComponent({
  name: 'PaymentForm',
  props: {
    onSubmit: {
      type: Function,
      required: true
    },
    isSubmitSuccess: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const isSuccess = ref(props.isSubmitSuccess)
    const formattedOrderId = ref('')
    const state = ref({
      name: '',
      email: '',
      cardNumber: '',
      cvv: '',
      expiration: ''
    })

    const errors = ref<PaymentFormError>({
      name: { hasError: false, message: '' },
      email: { hasError: false, message: '' },
      cardNumber: { hasError: false, message: '' },
      cvv: { hasError: false, message: '' },
      expiration: { hasError: false, message: '' }
    })

    const handleSubmit = () => {
      const { validatedFields, errorArray } = getRequiredPaymentFormValidation(state.value)

      errors.value = validatedFields
      if (errorArray.length === 0) {
        props.onSubmit(state.value)
      }
    }

    watch(() => props.isSubmitSuccess, (newValue: boolean) => {
      isSuccess.value = newValue
    })

    watch(() => props.orderId, (newValue: number) => {
      formattedOrderId.value = getFormattedOrderNumber(newValue)
    })

    const reloadPage = () => {
      window.location.reload()
    }

    return { handleSubmit, errors, state, isSuccess, reloadPage, formattedOrderId }
  }
})
</script>

<style scoped>
.payment__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.payment-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.payment {
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;
  grid-template-columns: auto auto;
  grid-template-rows: 6rem 6rem 6rem;
  grid-template-areas: "name name""email email""cardNumber cardNumber""expiration cvv";
  max-width: 32rem;
  color: #707070;
}
.payment .payment__field:first-of-type {
    grid-area: name;
}
.payment .payment__field:nth-of-type(2) {
    grid-area: email;
}

.payment .payment__field:nth-of-type(3) {
    grid-area: cardNumber;
}

.payment .payment__field:nth-of-type(4) {
    grid-area: expiration;
}

.payment .payment__field:nth-of-type(5) {
    grid-area: cvv;
}

.payment__field input {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

.payment__field {
    position: relative;
}

.payment label {
    padding-bottom: 10px;
    font-size: 13px;
}

.payment input {
    margin-top: 0.5rem;
    padding: 1rem;
    width: 100%;
    border-radius: 3px;
    border: 1px solid #dcdcdc;
}

.cart__button {
  width: 100%;
  border-radius: 2px;
  background-color: #F43F5E;
  height: 2.5rem;
  text-transform: uppercase;
  color: white;
  font-size: 1.2rem;
  margin-top: 2rem;
}

.cart__button.return{
  max-width: 32rem;
}

.error {
  color: #ff0000;
}

.payment__success {
  width: 32rem;
  height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.payment__success__order {
  font-size: 2rem;
}
.payment__success__message {
  margin-top: 2rem;
  font-size: 1.5rem;
}

</style>

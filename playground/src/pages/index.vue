<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watchEffect,
} from 'vue'
import {
  type Options,
  createPaymentFrame,
  PaymentTarget,
  isPaymentEvent,
  PaymentEvent,
} from '@belongnet/sdk'
import { useDark, useClipboard, useColorMode, useCycleList } from '@vueuse/core'
import isMongoId from 'validator/es/lib/isMongoId'
import isSlug from 'validator/es/lib/isSlug'
import { Icon } from '@iconify/vue'
import { useRouteHash } from '@vueuse/router'
import { toast } from 'vue-sonner'
import { formatCode } from '../formatter'
import { fromHash, toHash } from '../utils/hash'
import { useHighlighter } from '../composables/useHighlighter'

const belongPaymentRef = ref<HTMLElement | null>(null)
const highlighter = useHighlighter()
const isDark = useDark()
const mode = useColorMode({
  emitAuto: true,
})
const modeCycleList = useCycleList(['dark', 'light', 'auto'] as const, {
  initialValue: mode,
})
watchEffect(() => (mode.value = modeCycleList.state.value))

const hash = useRouteHash()
const { copy } = useClipboard()

const defaultState = {
  origin: undefined,
  params: {
    target: PaymentTarget.EventTicket,
    eventId: '65cca181e81ea188206cf1dc',
    hubId: undefined,
    checkoutId: undefined,
  },
} as const

const state = ref<Options>({ ...defaultState })

function setCoupon(e: Event) {
  if (state.value.params.target !== PaymentTarget.EventTicket) return
  const coupon = (e.target as HTMLInputElement).value

  state.value = {
    ...state.value,
    params: {
      ...state.value.params,
      key: coupon,
      coupon,
    },
  }
}

function setPrivateKey(e: Event) {
  const checked = (e.target as HTMLInputElement).checked

  const params = {
    ...state.value.params,
  }

  if (checked && 'key' in params) params.key = ''
  else if ('key' in params) delete params.key
  if ('coupon' in params) delete params.coupon

  state.value = {
    ...state.value,
    params,
  }
}

watchEffect(() => {
  hash.value = '#' + toHash(state.value)
})

function initFromHash() {
  if (!hash.value?.startsWith('#')) return

  try {
    const v = fromHash<Options>(hash.value.slice(1))
    if (v) {
      state.value = {
        ...state.value,
        ...v,
      }
    }
  } catch (e) { }
}

const errors = ref<string>()

function isCorrectId(id: string) {
  return ('' + id).length && (isMongoId(id) || isSlug(id))
}

const paramsToCode = computed(() => {
  const p = toValue(state.value.params)

  if (p.target === PaymentTarget.EventTicket) {
    return {
      target: p.target,
      key: p?.key,
      eventId: p.eventId,
      coupon: p?.coupon,
    }
  }

  if (p.target === PaymentTarget.HubMinting) {
    return {
      target: p.target,
      hubId: p.hubId,
    }
  }

  // Checkout target
  return {
    target: p.target,
    checkoutId: p.checkoutId,
  }
})

const paymentFrame = ref()

function generatePaymentFrame() {
  errors.value = undefined

  const p = toValue(state.value.params)

  if (
    belongPaymentRef.value &&
    p.target &&
    ((p.target === PaymentTarget.EventTicket && isCorrectId(p.eventId)) ||
      (p.target === PaymentTarget.HubMinting && isCorrectId(p.hubId)) ||
      (p.target === PaymentTarget.Checkout && isCorrectId(p.checkoutId)))
  ) {
    try {
      const result = createPaymentFrame({
        el: belongPaymentRef.value,
        origin: state.value.origin,
        params: paramsToCode.value,
      })
      paymentFrame.value = result
    } catch (e: any) {
      console.error(e)
      errors.value = e.message
    }
  } else {
    errors.value = 'Error: Please fill all fields correctly'
  }
}

function handlePayment(e: MessageEvent) {
  if (isPaymentEvent(e)) {
    let type: keyof typeof toast = 'message'

    switch (e.data.type) {
      case PaymentEvent.PaymentCanceled:
        type = 'error'
        break

      case PaymentEvent.PaymentSuccess:
        type = 'success'
        break
      case PaymentEvent.PaymentError:
        type = 'error'
        break
      case PaymentEvent.Loaded:
        type = 'info'
        break
    }

    toast[type](e.data.payload?.message, {
      duration: Infinity,
      closeButton: true,
    })
  }
}

onBeforeUnmount(() => {
  window.removeEventListener('message', handlePayment)
})

onMounted(() => {
  window.addEventListener('message', handlePayment)
  generatePaymentFrame()

  initFromHash()
})

const sourceHtmlCode = ref('')

watchEffect(() => {
  formatCode(`
    createPaymentFrame({${state.value.origin ? `\norigin: '${state.value.origin}',` : ''}
      el: document.getElementById('belong-payment-frame'),
      params: ${JSON.stringify(paramsToCode.value, null, 2)},
    })`).then((code) => {
    sourceHtmlCode.value = code
  })
})

const htmlCode = computed(() => {
  if (!sourceHtmlCode.value) return ''
  return highlighter.codeToHtml(sourceHtmlCode.value, {
    lang: 'javascript',
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  })
})
</script>

<template>
  <div class="container mx-auto">
    <main
      class="p-4 md:p-2 mx-auto grid md:py-10 box-border grid-cols-1 md:grid-cols-2 grid-rows-[auto_1fr] md:grid-rows-1 gap-8 h-screen">
      <section class="h-[50em] max-h-[50em] md:h-full">
        <div class="m-0! app-frame mac wireframe borderless scrolling h-full" :class="isDark ? 'dark' : ''">
          <div ref="belongPaymentRef"></div>
        </div>
      </section>

      <section class="flex flex-col gap-2 md:maxlength-w-xl order-[-1] md:order-none">
        <header class="flex flex-col">
          <div class="flex justify-between">
            <div>
              <a href="https://github.com/belongnet/sdk" target="_blank" class="flex items-center gap-2">
                <h1 class="text-3xl font-bold line-height-0">@belongnet/sdk</h1>
                <Icon icon="ion:logo-github" class="w-6 h-6" />
              </a>
            </div>

            <div>
              <button @click="modeCycleList.next()" class="p-0 w-8 h-8 flex items-center justify-center">
                <Icon v-if="mode === 'dark'" icon="carbon:moon" />
                <Icon v-if="mode === 'light'" icon="carbon:sun" />
                <Icon v-if="mode === 'auto'" icon="carbon:laptop" />
              </button>
            </div>
          </div>
          <p>Payment Frame Generator</p>
        </header>

        <section class="flex flex-col gap-2">
          <h3>Params:</h3>

          <section>
            <h4>Target:</h4>
            <input type="radio" :id="PaymentTarget.EventTicket" :value="PaymentTarget.EventTicket"
              v-model="state.params.target" />
            <label :for="PaymentTarget.EventTicket">Event Ticket</label><br />
            <input type="radio" :id="PaymentTarget.HubMinting" :value="PaymentTarget.HubMinting"
              v-model="state.params.target" />
            <label :for="PaymentTarget.HubMinting">Hub minting</label><br />
            <input type="radio" :id="PaymentTarget.Checkout" :value="PaymentTarget.Checkout"
              v-model="state.params.target" />
            <label :for="PaymentTarget.Checkout">Checkout</label><br />
          </section>
          <section>
            <template v-if="state.params.target === PaymentTarget.EventTicket">
              <h4>Event ID:</h4>
              <input type="text" v-model="state.params.eventId" placeholder="Event ID" maxlength="50" />
            </template>

            <template v-if="state.params.target === PaymentTarget.HubMinting">
              <h4>Hub ID:</h4>
              <input type="text" v-model="state.params.hubId" placeholder="Hub ID" maxlength="50" />
            </template>

            <template v-if="state.params.target === PaymentTarget.Checkout">
              <h4>Checkout ID:</h4>
              <input type="text" v-model="state.params.checkoutId" placeholder="Checkout ID" maxlength="50" />
            </template>

            <div>Enter correct <b>slug</b> or <b>id (ObjectId)</b></div>
          </section>

          <section class="flex flex-col gap-2">
            <div>
              <input id="private_key" type="checkbox" :checked="state.params.target === PaymentTarget.EventTicket &&
                state.params.key !== undefined
                " @change="setPrivateKey" />
              <label for="private_key">Private</label>
            </div>

            <template v-if="state.params.target === PaymentTarget.EventTicket">
              <h5>Key:</h5>
              <div>
                <input type="text" v-model="state.params.key" placeholder="Enter Key..." maxlength="50" />
              </div>

              <template v-if="state.params.target === PaymentTarget.EventTicket">
                <h5>Coupon:</h5>
                <div>
                  <input type="text" :value="'coupon' in state.params ? state.params.coupon : ''" @input="setCoupon"
                    placeholder="Enter coupon..." maxlength="50" />
                  <p>If you enter a coupon, it must match the private key.</p>
                </div>
              </template>
            </template>
          </section>

          <section class="flex flex-col gap-2">
            <h3>Additional:</h3>
            <div>
              <input id="custom_origin" type="checkbox" :checked="state.origin !== undefined" @change="
                ($event.target as HTMLInputElement).checked
                  ? (state.origin = '')
                  : (state.origin = undefined)
                " />
              <label for="custom_origin">Enable custom origin</label>
            </div>
            <input v-if="state.origin !== undefined" type="text" v-model="state.origin"
              placeholder="Enter custom Origin..." maxlength="61" />
          </section>
        </section>

        <section>
          <div v-show="errors" class="text-red my-2">
            {{ errors }}
          </div>

          <button @click="generatePaymentFrame()">
            Generate Payment Frame
          </button>
        </section>

        <section class="flex flex-col gap-2">
          <div v-if="paymentFrame?.url">
            <h3>Url:</h3>
            <div class="code-container">
              <input type="text" :value="paymentFrame.url" readonly class="bg-white" />
              <a title="Open in new tab" class="button copy copy--input" :href="paymentFrame.url" target="_blank">
                <Icon icon="ion:open"></Icon>
              </a>
            </div>
          </div>
          <div>
            <h3>Code:</h3>
            <div class="code-container">
              <button title="Copy Code" class="copy" @click="copy(sourceHtmlCode)">
                <Icon icon="ion:copy"></Icon>
              </button>
              <div v-html="htmlCode" class="code"></div>
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<style>
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
}

.code-container {
  @apply relative mt-2;

  &:hover {
    .copy {
      @apply op-100;
    }
  }

  .copy {
    @apply transition op-80 absolute flex items-center justify-center top-2 right-2 p-0 w-8 h-8 rounded-lg;
  }

  .copy--input {
    @apply top-0 bottom-0 right-0 m-auto right-1.5;
  }

  .code {
    .shiki {
      @apply rounded-lg overflow-hidden p-4 overflow-auto text-sm;
    }
  }
}

h2 {
  @apply text-2xl font-bold;
}

h3 {
  @apply text-lg font-bold;
}

h4 {
  @apply text-base font-bold;

  &+input {
    @apply mt-2;
  }
}

h5 {
  @apply text-base font-semibold;
}

input[type='radio'],
input[type='checkbox'] {
  &+label {
    @apply pl-2 cursor-pointer;
  }
}

input[type='text'] {
  @apply w-full p-2 border border-gray-300 rounded-lg dark:text-black;
}

button,
a.button {
  @apply border-0 bg-[length:200%_auto] bg-gradient-to-br from-yellow-400 via-purple-500 to-blue-400 text-white font-semibold text-base md:text-lg px-6 py-2 rounded-lg shadow-lg hover:scale-98 transform transition-transform duration-300 ease-in-out;
  animation: gradient_move 8s ease infinite;
}

@keyframes gradient_move {
  0% {
    background-position: 0% 92%;
  }

  50% {
    background-position: 100% 9%;
  }

  100% {
    background-position: 0% 92%;
  }
}
</style>

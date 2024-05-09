<script setup lang="ts">
import { onMounted, ref, toValue } from 'vue'
import { type Options, createPaymentFrame, PaymentTarget } from '@belongnet/sdk'
import { StorageSerializers, useDark, useStorage } from '@vueuse/core'
const belongPaymentRef = ref<HTMLElement | null>(null)
import isMongoId from 'validator/es/lib/isMongoId'
import isSlug from 'validator/es/lib/isSlug'

const isDark = useDark()

const state = useStorage<Options>(
  'state',
  {
    mode: 'production',
    params: {
      target: PaymentTarget.EventTicket,
      eventId: '65cca181e81ea188206cf1dc',
    },
  },
  undefined,
  {
    mergeDefaults: true,
    serializer: StorageSerializers.object,
  }
)

const isError = ref(false)

function isCorrectId(id: string) {
  return ('' + id).length && (isMongoId(id) || isSlug(id))
}

function generatePaymentFrame() {
  isError.value = false

  const p = toValue(state.value.params)

  if (
    belongPaymentRef.value &&
    p.target &&
    ((p.target === PaymentTarget.EventTicket && isCorrectId(p.eventId)) ||
      (p.target === PaymentTarget.HubMinting && isCorrectId(p.hubId)))
  ) {
    return createPaymentFrame({
      el: belongPaymentRef.value,
      mode: state.value.mode,
      params:
        p.target === PaymentTarget.EventTicket
          ? {
              target: p.target,
              key: p?.key,
              eventId: p.eventId,
            }
          : {
              target: p.target,
              key: p?.key,
              hubId: p.hubId,
            },
    })
  }

  isError.value = true
}

onMounted(() => {
  generatePaymentFrame()
})
</script>

<template>
  <div class="container mx-auto">
    <main
      class="p-2 mx-auto grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_1fr] md:grid-rows-1 gap-2 h-screen"
    >
      <section class="flex flex-col gap-2">
        <header class="py-4">
          <div>
            <h1 class="text-3xl font-bold">@belongnet/sdk</h1>
          </div>
        </header>

        <section>
          <h3>Mode</h3>
          <input
            type="radio"
            id="mode_production"
            value="production"
            v-model="state.mode"
          />
          <label for="mode_production">Production</label><br />
          <input
            type="radio"
            id="mode_staging"
            value="staging"
            v-model="state.mode"
          />
          <label for="mode_staging">Staging</label><br />
        </section>

        <section class="flex flex-col gap-2">
          <h3>Params:</h3>

          <section>
            <h4>Target:</h4>
            <input
              type="radio"
              :id="PaymentTarget.EventTicket"
              :value="PaymentTarget.EventTicket"
              v-model="state.params.target"
            />
            <label :for="PaymentTarget.EventTicket">Event Ticket</label><br />
            <input
              type="radio"
              :id="PaymentTarget.HubMinting"
              :value="PaymentTarget.HubMinting"
              v-model="state.params.target"
            />
            <label :for="PaymentTarget.HubMinting">Hub minting</label><br />
          </section>
          <section>
            <template v-if="state.params.target === PaymentTarget.EventTicket">
              <h4>Event ID:</h4>
              <input
                type="text"
                v-model="state.params.eventId"
                placeholder="Event ID"
              />
            </template>

            <template v-if="state.params.target === PaymentTarget.HubMinting">
              <h4>Hub ID:</h4>
              <input
                type="text"
                v-model="state.params.hubId"
                placeholder="Hub ID"
              />
            </template>

            <div>Enter correct <b>slug</b> or <b>id (ObjectId)</b></div>
          </section>
          <section>
            <h4>Key</h4>
            <input type="text" v-model="state.params.key" placeholder="Key" />
          </section>
        </section>

        <section>
          <div v-show="isError" class="text-red my-2">
            {{ isError ? 'Error: Please fill all fields correctly' : '' }}
          </div>

          <button @click="generatePaymentFrame()">
            Generate Payment Frame
          </button>
        </section>
      </section>

      <section class="h-full">
        <div
          class="app-frame mac wireframe borderless scrolling h-full"
          :class="isDark ? 'dark' : ''"
        >
          <div ref="belongPaymentRef"></div>
        </div>
      </section>

      <footer class="grid-col-[1/-1]">
        <div class="text-center py-4">
          <p>
            &copy; 2024 by
            <a href="https://github.com/reslear" target="_blank">reslear</a>
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>

<style>
h2 {
  @apply text-2xl font-bold;
}
h3 {
  @apply text-lg font-bold;
}
h4 {
  @apply text-base font-bold;

  & + input {
    @apply mt-2;
  }
}
input[type='radio'] {
  & + label {
    @apply pl-2;
  }
}

button {
  @apply text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2;
}
</style>

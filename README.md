# @belongnet/sdk

JavaScript SDK for integrating with Belong.net widget for seamless payment implementation on your website or application frontend.

[![Version](https://img.shields.io/npm/v/@belongnet/sdk)](https://www.npmjs.com/@belongnet/sdk)

- [👀 Demo online constructor](https://belongnet.github.io/sdk/)

## Installation

#### NPM:

You can install using npm, yarn, or pnpm:

```bash
pnpm add @belongnet/sdk

# or
npm install @belongnet/sdk

# or
yarn add @belongnet/sdk
```

and then import it in your project:

```ts
import { createPaymentFrame } from '@belongnet/sdk'
```

#### CDN:

To load scripts as modules, it's recommended to use [esm.sh](https://esm.sh/). Add this to the bottom of your HTML file:

```html
<script type="module">
  import { createPaymentFrame } from 'https://esm.sh/@belongnet/sdk@0.1.5'
</script>
```

> **Note:** Pin the version number to avoid breaking changes in production.

You can also try [jsDelivr](https://www.jsdelivr.com/) or [unpkg](https://unpkg.com/), but they haven't been tested.

#### Usage:

Use in your project:

```ts
createPaymentFrame({
  el: document.getElementById('belong-payment-frame'),
  params: {
    target: 'event-ticket',
    eventId: 'f9b2ea4c7be71407fcb6ed2c',
  },
})
```

## Advanced Usage

### Event listeners:

To determine the outcome of a payment (success or failure and etc), you can set up event listeners that listen to events from the payment frame.
We provide `isPaymentEvent` utility to help identify payment-related events.

```ts
import { isPaymentEvent } from '@belongnet/sdk'

function handlePayment(e: MessageEvent) {
  if (isPaymentEvent(e)) {
    switch (e.data.type) {
      case 'payment-success':
        // logic for successful payment
        console.log('payment-success', e.data.payload.link)
        break
      case 'payment-error':
        // logic for payment error
        console.log('payment-error', e.data.payload)
        break
    }
  }
}

// Add the event listener to listen for messages from the payment frame:
window.addEventListener('message', handlePayment)

// Remove the event listener when it is no longer needed to avoid potential memory leaks
function onUnmount() {
  window.removeEventListener('message', handlePayment)
}
```

This method makes sure your app reacts well to payment events, giving users a smooth experience even if payments fail. But it's only for showing visual changes on the frontend. For safer payments, you need server-side processing with the API too.

## API

<!-- automd:jsdocs src="src/index" -->

### `createPaymentFrame(options)`

Creates a payment frame for embedding payment forms.

### `isPaymentEvent(event)`

Checks if the provided event is a Belong payment event.

### `PaymentEvent`

#### `Loaded`

- **Type**: `string`
- **Default**: `"loaded"`

#### `PaymentCanceled`

- **Type**: `string`
- **Default**: `"payment-canceled"`

#### `PaymentError`

- **Type**: `string`
- **Default**: `"payment-error"`

#### `PaymentSuccess`

- **Type**: `string`
- **Default**: `"payment-success"`

### `PaymentTarget`

#### `EventTicket`

- **Type**: `string`
- **Default**: `"event-ticket"`

#### `HubMinting`

- **Type**: `string`
- **Default**: `"hub-minting"`

### `validateEvent(data)`

Validates the provided payment event data.

### `validateParams(params)`

Validates the provided parameters.

<!-- /automd -->

## License

This project is licensed under the terms of the [MIT license](LICENSE).

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->

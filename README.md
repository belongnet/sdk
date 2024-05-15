# @belongnet/sdk

A JavaScript SDK for integrating with [Belong.net](https://belong.net)

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

add to the bottom of your HTML file with the following content.

```html
<script type="module">
  import { createPaymentFrame } from 'https://esm.sh/@belongnet/sdk'
</script>
```

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

You can listen to the events from the payment frame.

```ts
import { isBelongPaymentEvent } from '@belongnet/sdk'

function handlePayment(e: MessageEvent) {
  if (isBelongPaymentEvent(e)) {
    switch (e.data.type) {
      case 'payment-success':
        console.log('payment-success', e.data.payload.link)
        break
      case 'payment-error':
        console.log('payment-error', e.data.payload)
        break
    }
  }
}

// add event listener
window.addEventListener('message', handlePayment)

// don't forget to remove the event listener
function onUnmount() {
  window.removeEventListener('message', handlePayment)
}
```

## API

<!-- automd:jsdocs src="src/index" -->

### `createPaymentFrame(options)`

Creates a payment frame for embedding payment forms.

### `isBelongPaymentEvent(event)`

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

<!-- /automd -->

## License

This project is licensed under the terms of the [MIT license](LICENSE).

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->

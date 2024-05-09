# @belongnet/sdk

A JavaScript SDK for integrating with [Belong.net](https://belong.net)

[![Version](https://img.shields.io/npm/v/@belongnet/sdk)](https://www.npmjs.com/@belongnet/sdk)

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
    hubId: 'f9b2ea4c7be71407fcb6ed2c',
  },
})
```

## Advanced Usage

### Event listeners:

You can listen to the events from the payment frame.

```ts
import { isBelongEvent } from '@belongnet/sdk'

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

## Api

### `createPaymentFrame`

Create a payment frame.

### `isBelongEvent`

Check if the event is a belong event.

## License

This project is licensed under the terms of the [MIT license](LICENSE).

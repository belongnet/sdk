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

The SDK supports several payment targets for different use cases:

##### Event Ticket Payment
Used for purchasing tickets to events. Requires an `eventId` to identify the specific event.
```ts
import { PaymentTarget } from '@belongnet/sdk'

createPaymentFrame({
  el: document.getElementById('belong-payment-frame'),
  params: {
    target: PaymentTarget.EventTicket,
    eventId: '65f1c7a33e51d8e4c2a9b4d2',
  },
})
```

##### Hub Minting Payment
Used for minting operations within a hub. Requires a `hubId` to identify the specific hub.
```ts
createPaymentFrame({
  el: document.getElementById('belong-payment-frame'),
  params: {
    target: PaymentTarget.HubMinting,
    hubId: '65f1c7b12f90ae7d31c8e5f1',
  },
})
```

##### Checkout Payment
Used for general checkout operations. Requires a `checkoutId` to identify the specific checkout session.
```ts
createPaymentFrame({
  el: document.getElementById('belong-payment-frame'),
  params: {
    target: PaymentTarget.Checkout,
    checkoutId: '65f1c7c8d4a5b3e9f8c1d2e3',
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

**Example:**

```js
import { PaymentTarget } from '@belongnet/sdk'

const { frame, url } = createPaymentFrame({
  el: document.getElementById('payment-frame'),
  origin: 'https://example.com',
  params: {
    target: PaymentTarget.EventTicket,
    eventId: '65f1c7a33e51d8e4c2a9b4d2',
  },
})
```

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

Available payment targets for different use cases:

#### `EventTicket`

- **Type**: `string`
- **Default**: `"event-ticket"`
- **Description**: Used for event ticket purchases. Requires `eventId` parameter.

#### `HubMinting`

- **Type**: `string`
- **Default**: `"hub-minting"`
- **Description**: Used for hub minting operations. Requires `hubId` parameter.

#### `Checkout`

- **Type**: `string`
- **Default**: `"checkout"`
- **Description**: Used for general checkout operations. Requires `checkoutId` parameter.

### `validateEvent(data)`

Validates the provided payment event data.

### `validateParams(params)`

Validates the provided parameters.

<!-- /automd -->

## Target Parameters Reference

Each target requires specific parameters. Here's a detailed breakdown:

### Event Ticket Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `PaymentTarget` | Must be `PaymentTarget.EventTicket` |
| `eventId` | `string` | Unique identifier of the event (24 characters) |
| `coupon` | `string` | Optional coupon code for discounts |

### Hub Minting Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `PaymentTarget` | Must be `PaymentTarget.HubMinting` |
| `hubId` | `string` | Unique identifier of the hub (24 characters) |

### Checkout Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `PaymentTarget` | Must be `PaymentTarget.Checkout` |
| `checkoutId` | `string` | Unique identifier of the checkout (24 characters) |

## License

This project is licensed under the terms of the [MIT license](LICENSE).

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->

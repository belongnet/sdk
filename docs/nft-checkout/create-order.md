# Creating NFT Checkout Order

Before implementing the checkout UI, you need to create an order using the Belong.net API.

## Getting API Access

To get your API key (`x-api-key`), please contact us at [join@belong.net](mailto:join@belong.net).
We will provide you with the necessary credentials and additional information to get started.

## API Endpoint

```bash
POST https://api.belong.net/api/v2/nft-checkout
```

### Headers

```bash
Content-Type: application/json
x-api-key: YOUR_API_KEY  # Contact join@belong.net to get your API key
```

## Request Body

```json
{
  "collectionId": "67db3b9b895ace9183f6b1c6",
  "items": [
    {
      "name": "Item 1",
      "description": "Item 1 description",
      "mintPrice": 0.3,
      "image": "https://mushroomholistic.com/cdn/shop/files/DSC04554.jpg",
      "quantity": 1,
      "externalUrl": "https://mushroomholistic.com"
    },
    {
      "name": "Item 2",
      "description": "Item 2 description",
      "mintPrice": 0.2,
      "image": "https://mushroomholistic.com/cdn/shop/files/9ae1ec563dbecc6ca3c7da5be22a88e9.jpg",
      "quantity": 2,
      "externalUrl": "https://mushroomholistic.com"
    }
  ]
}
```

### Parameters Description

- `collectionId` (required): Your NFT collection ID
- `items` (required): Array of items to be minted
  - `name` (required): Name of the NFT
  - `description`: Description of the NFT
  - `mintPrice` (required): Price in ETH
  - `image` (required): URL of the NFT image
  - `quantity` (required): Number of copies to mint
  - `externalUrl`: External URL associated with the NFT

## Response

```json
{
  "checkoutId": "checkout_id_here",
  "status": "pending",
  "expiresAt": "2024-03-21T10:00:00Z"
}
```

### Using the Response

Use the `checkoutId` from the response to initialize the checkout UI:

```typescript
import { createPaymentFrame, PaymentTarget } from '@belongnet/sdk'

const { frame } = createPaymentFrame({
  el: document.getElementById('nft-checkout-frame'),
  params: {
    target: PaymentTarget.Checkout,
    checkoutId: 'checkout_id_here', // Use the checkoutId from the API response
  },
})
```

## Example API Call

Using fetch:

```typescript
async function createNftCheckout() {
  const response = await fetch('https://api.belong.net/api/v2/nft-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY', // Contact join@belong.net to get your API key
    },
    body: JSON.stringify({
      collectionId: '67db3b9b895ace9183f6b1c6',
      items: [
        {
          name: 'Item 1',
          description: 'Item 1 description',
          mintPrice: 0.3,
          image: 'https://mushroomholistic.com/cdn/shop/files/DSC04554.jpg',
          quantity: 1,
          externalUrl: 'https://mushroomholistic.com',
        },
      ],
    }),
  })

  const data = await response.json()
  return data.checkoutId
}
```

Using axios:

```typescript
import axios from 'axios'

async function createNftCheckout() {
  const { data } = await axios.post(
    'https://api.belong.net/api/v2/nft-checkout',
    {
      collectionId: '67db3b9b895ace9183f6b1c6',
      items: [
        {
          name: 'Item 1',
          description: 'Item 1 description',
          mintPrice: 0.3,
          image: 'https://mushroomholistic.com/cdn/shop/files/DSC04554.jpg',
          quantity: 1,
          externalUrl: 'https://mushroomholistic.com',
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YOUR_API_KEY', // Contact join@belong.net to get your API key
      },
    }
  )

  return data.checkoutId
}
```

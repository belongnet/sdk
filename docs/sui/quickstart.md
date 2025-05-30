# Creating and Minting NFTs on SUI Network

## Quick Start Guide

### What You Need

- SUI wallet address
- SUI tokens for gas fees
- Images and metadata for NFTs

### Simple Workflow

**1. Create Collection** → **2. Create Kiosk** → **3. Mint NFT**

#### Step 1: Create Collection

```javascript
// Publish collection
const publishData = {
  walletAddress: '0x1234...',
  name: 'My Collection',
  symbol: 'MC',
  description: 'My NFT collection',
  image_url: 'https://example.com/image.png',
  feeNumerator: 250, // 2.5% royalty
  mintPrice: 1000000000, // 1 SUI in MIST
  whitelistMintPrice: 500000000,
  transferable: true,
  maxTotalSupply: 1000,
  collectionExpire: 1735689600,
  isSui: true,
}

// 1. Publish
fetch('/collection/publish', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(publishData),
})

// 2. Sign transaction with wallet

// 3. Create collection
fetch('/collection/create', {
  method: 'POST',
  body: JSON.stringify({
    transaction: signedTransaction,
    name: 'My Collection',
    symbol: 'MC',
    collectionCap: '0x...',
    referralCode: 'REF123',
  }),
})
```

#### Step 2: Create Kiosk

```javascript
// Get kiosk transaction
fetch('/kiosk/sign', {
  method: 'POST',
  body: JSON.stringify({ walletAddress: '0x1234...' }),
})

// Sign transaction, then create kiosk
fetch('/kiosk/create', {
  method: 'POST',
  body: JSON.stringify({
    receipt: signedTransaction,
    collection: '0x5678...',
    owner: '0x1234...',
  }),
})
```

#### Step 3: Mint NFT

```javascript
// Prepare mint
fetch('/mint/sign', {
  method: 'POST',
  body: JSON.stringify({
    collectionName: 'My Collection',
    collectionSymbol: 'MC',
    address: '0x1234...',
    kioskId: '0x2222...',
    kioskCap: '0x3333...',
    mintCapProps: {
      name: 'NFT #1',
      description: 'My first NFT',
      metadataLink: 'https://ipfs.io/ipfs/...',
      imageUrl: 'https://example.com/nft.png',
      whitelisted: false,
      uses: 1,
      capReceiver: '0x1234...',
    },
  }),
})

// Sign transaction, then mint
fetch('/mint', {
  method: 'POST',
  body: JSON.stringify({
    senderSignature: { signature: '0x...', signatureScheme: 'ED25519' },
    sponsorSignature: { signature: '0x...', signatureScheme: 'ED25519' },
  }),
})
```

### Vue Example

````vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)

async function mintNFT() {
  loading.value = true
  try {
    // 1. Get mint transaction
    const mintResponse = await fetch('/mint/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collectionName: 'My Collection',
        collectionSymbol: 'MC',
        address: userWallet.address,
        kioskId: '0x2222...',
        kioskCap: '0x3333...',
        mintCapProps: {
          name: 'My NFT',
          description: 'Simple NFT',
          imageUrl: 'https://example.com/nft.png',
        },
      }),
    })

    const mintData = await mintResponse.json()

    // 2. Sign transaction
    const signature = await userWallet.signTransaction(mintData.builtTx)

    // 3. Execute mint
    const result = await fetch('/mint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        senderSignature: signature,
        sponsorSignature: mintData.sponsorSignature,
      }),
    })

    const nft = await result.json()
    alert(`NFT created: ${nft.name}`)
  } catch (error) {
    alert(`Error: ${error.message}`)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <button :disabled="loading" @click="mintNFT">
    {{ loading ? 'Minting...' : 'Mint NFT' }}
  </button>
</template>

--- ## API Reference ### Collection Endpoints **POST /collection/publish**
```json { "walletAddress": "0x...", "name": "Collection Name", "symbol": "SYM",
"description": "Description", "image_url": "https://...", "feeNumerator": 250,
"mintPrice": 1000000000, "whitelistMintPrice": 500000000, "transferable": true,
"maxTotalSupply": 1000, "collectionExpire": 1735689600, "isSui": true }
````

Response:

```json
{
  "transaction": {},
  "name": "Collection Name",
  "symbol": "SYM",
  "collectionCap": "0x..."
}
```

**POST /collection/create**

```json
{
  "transaction": { "digest": "0x...", "effects": {}, "events": [] },
  "name": "Collection Name",
  "symbol": "SYM",
  "collectionCap": "0x...",
  "referralCode": "REF123"
}
```

**POST /collection/create-sponsored**

```json
{
  "collectionAddress": "0x...",
  "walletAddress": "0x..."
}
```

### Kiosk Endpoints

**POST /kiosk/sign**

```json
{ "walletAddress": "0x..." }
```

**POST /kiosk/create**

```json
{
  "receipt": { "digest": "0x...", "effects": {}, "events": [] },
  "collection": "0x...",
  "owner": "0x..."
}
```

**GET /kiosk?collection=0x...&owner=0x...**

### Mint Endpoints

**POST /mint/sign**

```json
{
  "collectionName": "Collection Name",
  "collectionSymbol": "SYM",
  "address": "0x...",
  "kioskId": "0x...",
  "kioskCap": "0x...",
  "mintCapProps": {
    "name": "NFT Name",
    "description": "NFT Description",
    "metadataLink": "https://...",
    "imageUrl": "https://...",
    "whitelisted": false,
    "uses": 1,
    "capReceiver": "0x..."
  }
}
```

**POST /mint**

```json
{
  "senderSignature": { "signature": "0x...", "signatureScheme": "ED25519" },
  "sponsorSignature": { "signature": "0x...", "signatureScheme": "ED25519" }
}
```

## Error Format

```json
{ "error": "Error message" }
```

## Status Codes

- `200` - Success
- `400` - Bad Request
- `500` - Internal Error

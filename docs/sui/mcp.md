# MCP Documentation for SUI NFTs

## Quick Guide

### What You Need

- SUI wallet
- MCP tools
- Collection data

### Simple Flow

**Publish** → **Create** → **Kiosk** → **Mint**

### MCP Tools

#### 1. `mcp_local_publish-collection`

Prepare collection for creation.

```json
{
  "data": {
    "walletAddress": "0x1234...",
    "name": "My Collection",
    "symbol": "MC",
    "description": "NFT collection",
    "image_url": "https://example.com/image.png",
    "feeNumerator": 250,
    "mintPrice": 1000000000,
    "whitelistMintPrice": 500000000,
    "transferable": true,
    "maxTotalSupply": 1000,
    "collectionExpire": 1735689600,
    "isSui": true
  }
}
```

#### 2. `mcp_local_create-collection`

Create collection on blockchain.

```json
{
  "data": {
    "transaction": { "digest": "0x...", "effects": {}, "events": [] },
    "name": "My Collection",
    "symbol": "MC",
    "collectionCap": "0x...",
    "referralCode": "REF123"
  }
}
```

#### 3. `mcp_local_create-sponsored-collection`

Enable gasless minting.

```json
{
  "data": {
    "collectionAddress": "0x...",
    "walletAddress": "0x..."
  }
}
```

#### 4. `mcp_local_sign-kiosk`

Get kiosk transaction.

```json
{
  "data": {
    "walletAddress": "0x..."
  }
}
```

#### 5. `mcp_local_create-kiosk`

Create kiosk.

```json
{
  "data": {
    "receipt": { "digest": "0x...", "effects": {}, "events": [] },
    "collection": "0x...",
    "owner": "0x..."
  }
}
```

#### 6. `mcp_local_get-kiosk`

Get existing kiosk.

```json
{
  "data": {
    "collection": "0x...",
    "owner": "0x..."
  }
}
```

#### 7. `mcp_local_mint-sign`

Prepare NFT mint.

```json
{
  "data": {
    "collectionName": "My Collection",
    "collectionSymbol": "MC",
    "address": "0x...",
    "kioskId": "0x...",
    "kioskCap": "0x...",
    "mintCapProps": {
      "name": "NFT #1",
      "description": "My NFT",
      "metadataLink": "https://ipfs.io/ipfs/...",
      "imageUrl": "https://example.com/nft.png",
      "whitelisted": false,
      "uses": 1,
      "capReceiver": "0x..."
    }
  }
}
```

#### 8. `mcp_local_mint`

Execute mint.

```json
{
  "data": {
    "senderSignature": { "signature": "0x...", "signatureScheme": "ED25519" },
    "sponsorSignature": { "signature": "0x...", "signatureScheme": "ED25519" }
  }
}
```

## Response Examples

### Collection Created

```json
{
  "nftAddress": "0x...",
  "produce_data": {
    "name": "My Collection",
    "creator": "0x...",
    "feeReceiver": "0x...",
    "symbol": "MC"
  }
}
```

### Kiosk Created

```json
{
  "kioskId": "0x...",
  "kioskCap": "0x...",
  "collection": "0x...",
  "owner": "0x..."
}
```

### NFT Minted

```json
{
  "id": { "id": "0x..." },
  "name": "NFT #1",
  "description": "My NFT",
  "metadataLink": "https://ipfs.io/ipfs/...",
  "image_url": "https://example.com/nft.png",
  "block_number": 12345,
  "hash": "0x..."
}
```

## Complete Example

```json
[
  {
    "tool": "mcp_local_publish-collection",
    "parameters": {
      "data": {
        "walletAddress": "0x1234...",
        "name": "Game Items",
        "symbol": "GI",
        "description": "Gaming NFTs",
        "image_url": "https://game.com/logo.png",
        "feeNumerator": 250,
        "mintPrice": 1000000000,
        "whitelistMintPrice": 500000000,
        "transferable": true,
        "maxTotalSupply": 1000,
        "collectionExpire": 1735689600,
        "isSui": true
      }
    }
  },
  {
    "tool": "mcp_local_create-collection",
    "parameters": {
      "data": {
        "transaction": { "digest": "0x...", "effects": {}, "events": [] },
        "name": "Game Items",
        "symbol": "GI",
        "collectionCap": "0x...",
        "referralCode": "GAME2024"
      }
    }
  },
  {
    "tool": "mcp_local_sign-kiosk",
    "parameters": {
      "data": { "walletAddress": "0x1234..." }
    }
  },
  {
    "tool": "mcp_local_mint-sign",
    "parameters": {
      "data": {
        "collectionName": "Game Items",
        "collectionSymbol": "GI",
        "address": "0x1234...",
        "kioskId": "0x2222...",
        "kioskCap": "0x3333...",
        "mintCapProps": {
          "name": "Sword +1",
          "description": "Magic sword",
          "imageUrl": "https://game.com/sword.png"
        }
      }
    }
  }
]
```

## Error Handling

```json
{ "error": "Error message" }
```

## Best Practices

- Validate addresses
- Check wallet balance
- Handle transaction signing
- Use IPFS for metadata
- Enable gasless for better UX

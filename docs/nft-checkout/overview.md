# NFT Checkout Overview

Create seamless NFT purchases with a checkout experience integrated into your website.

## Implementation Flow

1. **Create Checkout Order** - First, create an order using the [NFT Checkout API](./create-order.md)
2. **Initialize UI** - Use the received `checkoutId` to initialize the checkout interface
3. **Handle Events** - Process payment events and user interactions

## When to Use NFT Checkout?

- **You want to embed NFT purchasing directly into your site**
- **You need a reliable and secure checkout process**
- **You want to provide a seamless minting experience**

## Payment Methods

Our checkout supports multiple payment methods through integration with:

### Transak

Transak provides a fiat-to-crypto payment solution, allowing users to purchase NFTs using credit cards and bank transfers.

### Crossmint

Crossmint enables users to purchase NFTs with credit cards, providing a familiar Web2 payment experience.

## Documentation Structure

- [Create Order](./create-order.md) - Learn how to create a checkout order
- [Quick Start Guide](./quickstart.md) - Get started with UI implementation
- [Event Handling](./events.md) - Handle payment events
- [Transaction Status](./checkout.md#getting-transaction-status) - Monitor transaction status
- [Advanced Topics](./advanced.md) - Advanced features and customization
- [API Reference](./api-reference.md) - Complete API documentation

## Features

- Embedded checkout frame
- Multiple payment methods support
- Support for multiple NFTs in one order
- Secure transaction handling
- Payment status events
- Optional email parameter
- Error handling
- Transaction status monitoring

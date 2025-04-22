import { defineConfig } from 'vitepress'
import tailwindcss from '@tailwindcss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vue: {},
  vite: {
    plugins: [tailwindcss()],
  },
  title: 'SDK Belong.net',
  description:
    'widget for seamless payment implementation on your website or application frontend',

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    image: {
      lazyLoading: true,
    },
  },

  lastUpdated: true,

  appearance: 'dark',

  themeConfig: {
    siteTitle: false,
    logo: {
      light: '/light.svg',
      dark: '/dark.svg',
      alt: 'Belong.net Logo',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/overview' },
      /* { text: 'API Reference', link: '/api-reference' }, */
      {
        text: 'Belong.net',
        link: 'https://belong.net',
      },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/overview' },
          { text: 'Installation', link: '/installation' },
        ],
      },
      {
        text: 'NFT Checkout',
        items: [
          { text: 'Overview', link: '/nft-checkout/overview' },
          { text: 'Quick Start', link: '/nft-checkout/quickstart' },
          { text: 'Create Order', link: '/nft-checkout/create-order' },
          { text: 'Event Handling', link: '/nft-checkout/events' },
          {
            text: 'Transaction Status',
            link: '/nft-checkout/checkout#getting-transaction-status',
          },
          { text: 'Advanced Topics', link: '/nft-checkout/advanced' },
          { text: 'API Reference', link: '/nft-checkout/api-reference' },
        ],
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'Connect with MetaMask',
            link: '/guides/wallet',
          },
          { text: 'Create product collection', link: '/guides/collection' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'x', link: 'https://x.com/belongnet' },
      {
        icon: 'telegram',
        link: 'https://t.me/belongnet',
      },
      {
        icon: 'github',
        link: 'https://github.com/belongnet',
      },
    ],

    footer: {
      copyright: 'Copyright Belong, 2025.',
      message: 'All rights reserved.',
    },

    editLink: {
      pattern: 'https://github.com/belongnet/sdk/docs/:path',
      text: 'Suggest changes',
    },
  },
})

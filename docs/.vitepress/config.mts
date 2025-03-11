import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
          { text: 'Installation', link: '/installation' },
          { text: 'Get Status', link: '/get-status' },
        ],
      },
      {
        text: 'NFT Checkout',
        items: [{ text: 'Checkout', link: '/nft-checkout/checkout' }],
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

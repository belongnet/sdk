<script setup lang="ts">
import { useDark } from '@vueuse/core'
import { Toaster } from 'vue-sonner'

const isDark = useDark()
</script>

<template>
  <Toaster
    :theme="isDark ? 'dark' : 'light'"
    :visible-toasts="5"
    position="bottom-left"
    richColors
  />
  <router-view />
</template>

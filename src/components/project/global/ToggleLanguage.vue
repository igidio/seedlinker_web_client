<template>
  <button class="btn btn-ghost" @click="(locale === 'en') ? set_language('es') : set_language('en')">
  <span class="uppercase font-black">{{ locale }}</span>
  </button>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const  { set_language } = configStore
const { locale } = storeToRefs(configStore)
</script>

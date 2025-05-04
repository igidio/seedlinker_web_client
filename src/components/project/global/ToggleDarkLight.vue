<template>
  <button class="btn btn-ghost" @click="configStore.set_theme()">
  <Icon :icon="theme_icon"/>
  </button>

</template>

<script setup lang="ts">
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const configStore = useConfigStore()
const { selected_theme } = storeToRefs(configStore)

const theme_icon = computed(() =>
  selected_theme.value === 'light'
    ? 'ph:sun-dim-fill'
    : 'ph:moon-fill'
)
</script>

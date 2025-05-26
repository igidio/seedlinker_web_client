<template>
  <div class="flex flex-col justify-between items-center min-h-screen bg-base-200 p-2">
    <div class="flex flex-row justify-between w-full sticky top-0  z-50 bg-base-200 items-center">
      <RouterLink :to="{ name: 'home' }">
        <button class="btn btn-ghost">
          <Icon icon="ph:house-fill" />
          {{ $t('go_home') }}
        </button>
      </RouterLink>

      <select class="select select-ghost select-xs w-28" v-model="locale" @change="change_language">
        <option disabled selected>{{ $t('select_language') }}</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
    <div>
      <slot />
    </div>
    <UiFooter :simple_view="true" />
  </div>
</template>
<script setup lang="ts">
import UiFooter from '@/components/ui/UiFooter.vue'
import { Icon } from '@iconify/vue'
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const { locale } = storeToRefs(configStore)
const { set_language } = configStore

const change_language = (event: Event) => {
  const target = event.target as HTMLSelectElement
  set_language(target.value as 'en' | 'es')
}
</script>

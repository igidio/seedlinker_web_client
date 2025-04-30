<template>
  <div class="bg-white flex flex-col justify-between items-center h-screen p-4">
    <div class="flex flex-row justify-between w-full">
      <RouterLink :to="{ name: 'home' }">
        <button class="btn btn-ghost"><Icon icon="ph:house-fill" />{{ $t('go_home') }}</button>
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
    <UiFooter />
  </div>
</template>
<script setup lang="ts">
import UiFooter from '@/components/ui/UiFooter.vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const { locale } = storeToRefs(configStore)
const { set_language } = configStore

const change_language = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  set_language(target.value as 'en'|'es')
  // if (locale.value === 'en') {
  //   locale.value = 'es'
  //   localStorage.setItem('language', locale.value)
  //   return
  // }
  // locale.value = 'en'
  // localStorage.setItem('language', locale.value)
}
</script>

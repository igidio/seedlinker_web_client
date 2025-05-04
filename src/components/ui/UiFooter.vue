<template>
  <div class="flex flex-row items-center justify-center" v-if="simple_view">
    <span class="font-bold">{{ current }} igid.io</span>
  </div>
  <div class="flex flex-row justify-between items-center" v-else>
    <span class="font-bold">{{ current }} igid.io</span>
    <div>
      <ToggleDarkLight/>
      <ToggleLanguage/>
    </div>

  </div>
</template>

<script setup lang="ts">
import ToggleLanguage from '@/components/project/global/ToggleLanguage.vue'
import ToggleDarkLight from '@/components/project/global/ToggleDarkLight.vue'

const current = new Date().getFullYear()

withDefaults(defineProps<{
  simple_view?: boolean
}>(), {
  simple_view: false
})
</script>

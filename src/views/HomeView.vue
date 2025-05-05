<template>
  <div class="flex flex-col gap-4">
    <ConnectedDevices/>
    <hr/>
    <MyDevices v-if="is_authenticated"/>
  </div>
</template>

<script setup lang="ts">
import ConnectedDevices from '@/components/project/home/ConnectedDevices.vue'
import MyDevices from '@/components/project/home/MyDevices.vue'
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const { is_authenticated } = storeToRefs(configStore)
</script>

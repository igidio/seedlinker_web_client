<template>
  <ContentHeader
    :elements="[{ name: $t('home.title'), path: 'home', icon: 'ph:house-bold' }]"
    :title="$t('home.title')"
  />
  <div class="flex flex-col gap-4">
    <ConnectedDevices />

    <MyDevices v-if="is_authenticated" />
  </div>
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import ConnectedDevices from '@/components/project/home/ConnectedDevices.vue'
import MyDevices from '@/components/project/home/MyDevices.vue'
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const { is_authenticated } = storeToRefs(configStore)
</script>

<template>
  <UiCard class="w-full">
    <div class="border-base-300 border-b border-dashed pb-2 font-bold text-lg">
      {{ $t('home.card_connected_client.title') }}
    </div>
    <div class="flex flex-col gap-2">
      <div
        v-for="(client, key) in clients_connected"
        :key="key"
        class="border-base-200 border-b border-dashed pb-2 flex flex-col gap-1"
      >
        <span>{{ client?.brand }}</span>
        <span class="font-bold">{{ client?.platform }}</span>

      </div>

      <span>

      </span>
    </div>
  </UiCard>
</template>
<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import { storeToRefs } from 'pinia'
import { useDeviceStore } from '@/stores/device.store.ts'
import { computed } from 'vue'
const { connected_by_types } = storeToRefs(useDeviceStore())

const clients_connected = computed(() => {
  return connected_by_types.value.clients.map((e) => e.client?.info)
})
</script>

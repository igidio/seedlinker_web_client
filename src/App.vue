<template>
  <LoginModal/>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDeviceStore } from '@/stores/device.store.ts'
import LoginModal from '@/components/project/global/LoginModal.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useConfigStore } from '@/stores/config.store.ts'

const deviceStore = useDeviceStore()
const configStore = useConfigStore()

configStore.get_language()

onMounted(async () => {
  await deviceStore.initialize()
})
</script>

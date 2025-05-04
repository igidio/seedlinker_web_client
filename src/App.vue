<template>
  <div :data-theme="selected_theme">
    <ToastComponent/>

    <LoginModal />
    <AppLayout>
      <RouterView />
    </AppLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDeviceStore } from '@/stores/device.store.ts'
import LoginModal from '@/components/project/global/LoginModal.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'
import ToastComponent from '@/components/project/global/ToastComponent.vue'

const deviceStore = useDeviceStore()
const configStore = useConfigStore()
const { selected_theme } = storeToRefs(configStore)
configStore.get_language()

configStore.get_theme()
onMounted(async () => {
  await deviceStore.initialize()
})
</script>

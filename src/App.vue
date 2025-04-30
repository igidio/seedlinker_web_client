<template>
  <LoginModal/>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>

<script setup lang="ts">
import UiHeader from '@/components/ui/UiHeader.vue'
import UiFooter from '@/components/ui/UiFooter.vue'
import { onMounted, ref } from 'vue'
import { useDeviceStore } from '@/stores/device.store.ts'
import LoginModal from '@/components/project/global/LoginModal.vue'
import { useRoute } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const deviceStore = useDeviceStore()
const route = useRoute()

onMounted(async () => {
  await deviceStore.initialize()
})
</script>

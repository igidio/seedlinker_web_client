<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-row justify-between items-center">
      <span class="font-bold text-xl">Tu dispositivo</span>
      <UiLoading v-if="loading"/>
    </div>
    <span class="text-base-content" v-if="loading">{{ $t('device.loading') }}...</span>
    <div class="v-else">
      {{ data }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { api_client } from '@/utils/axios.ts'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useConfigStore } from '@/stores/config.store.ts'
import UiLoading from '@/components/ui/UiLoading.vue'
import type { DeviceInterface } from '@/interfaces'

const { generate_toast } = useConfigStore()
const loading = ref(true)
const data = ref<null|DeviceInterface>(null)

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  await api_client
    .get(`/devices/${route.params.uuid}`)
    .then((response) => {
      data.value = response.data
    })
    .catch((error) => {
      generate_toast({
        type: 'error',
        message: 'error.form.device_not_found',
      })
      router.replace('/')
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

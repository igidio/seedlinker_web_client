<template>
  <UiModal @close="on_close" v-model="trigger" :title="$t('device.config.delete.title')"
    ><div class="flex flex-col gap-4">
      <p class="label text-wrap">
        {{ $t('device.config.delete.description') }}
      </p>
    </div>
    <template #footer>
      <div class="flex flex-row gap-2">
        <button class="btn btn-sm" @click="on_close">
          {{ $t('cancel') }}
        </button>
        <button class="btn btn-error btn-sm" @click="on_delete" :disabled="is_loading">
          {{ $t('delete') }}
        </button>
      </div>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import { useDeviceStore } from '@/stores/device.store'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const trigger = defineModel<HTMLDialogElement>()
const error_message = ref<string | null>(null)
const is_loading = ref(false)
const router = useRouter()
const { fetch_data } = useDeviceStore()

const on_close = () => {
  trigger.value?.close()
  error_message.value = null
}

const delete_data = inject<() => Promise<void>>('delete_data')

const on_delete = async () => {
  is_loading.value = true
  if (delete_data) {
    try {
      await delete_data()
      await fetch_data()
      trigger.value?.close()
      await router.replace({ name: 'home' })
    } catch (e) {
      console.log(e)

      error_message.value = 'device.config.delete.error'
    }
  }
  is_loading.value = false
}
</script>

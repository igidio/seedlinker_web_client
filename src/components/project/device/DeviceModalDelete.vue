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
        <button class="btn btn-error btn-sm" @click="$emit('delete')">
          {{ $t('delete') }}
        </button>
      </div>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import { ref } from 'vue'

const trigger = defineModel<HTMLDialogElement>()
const error_message = ref<string | null>(null)

const on_close = () => {
  trigger.value?.close()
  error_message.value = null
}
</script>

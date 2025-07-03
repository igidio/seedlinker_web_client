<template>
  <form @submit.prevent="submit">
    <UiModal
      v-model="trigger"
      @close="
        () => {
          new_uuid = ''
          error_message = null
        }
      "
      :title="
        data.is_new
          ? $t('home.modal_connect_device.manual.title')
          : $t('home.modal_connect_device.auto.title', [data.type])
      "
    >
      <template v-slot:default>
        <div class="flex flex-col w-full" v-if="data.is_new">
          <p>{{ $t('home.modal_connect_device.manual.description') }}</p>
          <fieldset class="fieldset">
            <input
              type="text"
              class="input w-full"
              :placeholder="$t('home.modal_connect_device.manual.field.placeholder')"
              v-model="new_uuid"
            />
            <p class="label">{{ $t('home.modal_connect_device.manual.field.label') }}</p>
          </fieldset>
        </div>
        <div class="flex flex-col w-full" v-else>
          <p>{{ $t('home.modal_connect_device.auto.description') }}</p>
          <p class="font-bold">{{ data.uuid }}</p>
        </div>
        <p class="text-error text-end text-xs" v-if="error_message">{{ $t(error_message) }}</p>
      </template>
      <template v-slot:footer>
        <button class="btn btn-ghost" type="button" @click="trigger!.close">
          {{ $t('close') }}
        </button>
        <button class="btn btn-primary" :disabled="disable_save_button || is_loading">
          {{ $t('save') }}
        </button>
      </template>
    </UiModal>
  </form>
</template>
<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import { computed, ref } from 'vue'
import { is_valid_uuid } from '@/utils/validate_uuid.ts'
import { api_client } from '@/utils/axios.ts'
import type { AxiosError } from 'axios'
import { useDeviceStore } from '@/stores/device.store'
import { useConfigStore } from '@/stores/config.store'

const { generate_toast } = useConfigStore()
const trigger = defineModel<HTMLDialogElement>()
const error_message = ref<string | null>(null)
const deviceStore = useDeviceStore()
const { fetch_data } = deviceStore

const props = defineProps<{
  data: {
    uuid: string
    type: string | null
    is_new: boolean
  }
}>()
const new_uuid = ref('')
const is_loading = ref(false)
const disable_save_button = computed(() => {
  return props.data.is_new && !is_valid_uuid(new_uuid.value.trim())
})

const submit = async () => {
  const uuid_to_submit = props.data.is_new ? new_uuid.value.trim() : props.data.uuid
  is_loading.value = true
  if (!is_valid_uuid(uuid_to_submit)) {
    error_message.value = 'error.form.invalid_uuid'
    is_loading.value = false
    return
  }

  await api_client
    .post(`/devices/${uuid_to_submit}`)

    .then(async () => {
      trigger.value?.close()
      new_uuid.value = ''
      error_message.value = null
      generate_toast({
        type: 'success',
        message: 'device.new_connected_device',
      })
      setTimeout(async () => {
        await fetch_data();
      }, 1000)

    })
    .catch((e: AxiosError) => {
      error_message.value =
        (e.response?.data as { detail?: string })?.detail || 'error.form.unknown_error'
    })

    .finally(() => {
      is_loading.value = false
    })
}
</script>

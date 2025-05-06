<template>
  <form @submit.prevent="submit">
    <UiModal
      v-model="trigger"
      @close="() => {new_uuid = '';error_message = null;}"
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
        <p class="text-error text-end" v-if="error_message">{{ $t(error_message) }}</p>
      </template>
      <template v-slot:footer>
        <button class="btn" type="button" @click="trigger?.close">{{ $t('close') }}</button>
        <button class="btn btn-neutral" :disabled="disable_save_button || is_loading">
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

const trigger = defineModel<HTMLDialogElement>()
const error_message = ref<string | null>(null)

const props = defineProps<{
  data: {
    uuid: string
    type: string|null
    is_new: boolean
  }
}>()
const new_uuid = ref('')
const is_loading = ref(false)
const disable_save_button = computed(() => {
  return props.data.is_new && !is_valid_uuid(new_uuid.value)
})

const submit = async () => {
  const uuid_to_submit = props.data.is_new ? new_uuid.value.trim() : props.data.uuid
  console.log(uuid_to_submit)
  is_loading.value = true
  if (!is_valid_uuid(uuid_to_submit)) {
    error_message.value = 'error.form.invalid_uuid'
    is_loading.value = false
    return
  }
  await api_client
    .post(`/devices/${uuid_to_submit}`)
    .then(() => {
      trigger.value?.close()
      new_uuid.value = ''
      error_message.value = null
    })
    .catch((e: AxiosError) => {
      error_message.value = (e.response?.data as { detail?: string })?.detail || null
    })
    .finally(() => {
      is_loading.value = false
    })
}
</script>

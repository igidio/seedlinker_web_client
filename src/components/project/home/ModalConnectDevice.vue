<template>
  <form>
    <UiModal v-model="trigger" :title="data.is_new ? $t('home.modal_connect_device.manual.title') : $t('home.modal_connect_device.auto.title', [data.type])">
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
      </template>
      <template v-slot:footer>
        <button class="btn" type="button" @click="trigger?.close">{{ $t('close') }}</button>
        <button class="btn btn-neutral" :disabled="disable_save_button">{{ $t('save') }}</button>
      </template>
    </UiModal>
  </form>
</template>
<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import { computed, ref } from 'vue'
import { is_valid_uuid } from '@/utils/validate_uuid.ts'

const trigger = defineModel<HTMLDialogElement>()

const props = defineProps<{
  data: {
    uuid: string
    type: string
    is_new: boolean
  }
}>()
const new_uuid = ref('')

const disable_save_button = computed(() => {
  return props.data.is_new && !is_valid_uuid(new_uuid.value);
})
</script>

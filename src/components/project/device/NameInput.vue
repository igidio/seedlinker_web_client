<template>
  <div class="w-full">
    <div class="flex flex-row items-center gap-2 wrap-anywhere" v-if="!edit">
      <button class="btn btn-lg bg-base-300 btn-ghost" @click="set_edit">
        <Icon icon="ph:note-pencil-duotone" class="w-6 h-6" />
      </button>
      <span class="font-bold text-3xl">{{ title }}</span>
    </div>
    <div v-else class="flex flex-row items-center gap-2">
      <input
        type="text"
        :placeholder="$t('device.title')"
        class="input input-xl w-full"
        v-model="new_name"
        :maxlength="50"
      />
      <button
        class="btn btn-lg bg-base-300"
        @click="submit"
        :disabled="is_loading || new_name.length <= 0"
      >
        <Icon icon="ph:floppy-disk-back-duotone" class="w-6 h-6" />
      </button>
      <button
        class="btn btn-lg btn-ghost"
        @click="
          () => {
            edit = false
            new_name = title
          }
        "
      >
        <Icon icon="ph:x-duotone" class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import type { DeviceInterface } from '@/interfaces'
import { useDeviceComposable } from '@/composables/device.composable.ts'

const deviceComposable = useDeviceComposable()
const props = defineProps<{
  title: string
  save: (data: Partial<DeviceInterface>) => void
}>()
const is_loading = ref(false)

const edit = ref(false)
const new_name = ref('')

const set_edit = () => {
  edit.value = true
  new_name.value = props.title
}

const submit = async () => {
  is_loading.value = true
  edit.value = false
  props.save({
    name: new_name.value,
  })
  await deviceComposable.update_data({
    name: new_name.value,
  })
  is_loading.value = false
  //props.title = new_name.value
}
</script>

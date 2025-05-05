<template>
  <form @submit.prevent="submit">
    <UiModal v-model="trigger" :title="title" @close="on_close"></UiModal>
  </form>
</template>
<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'

const trigger = defineModel<HTMLDialogElement>()

const props = withDefaults(
  defineProps<{
    title: string
    data: {
      is_new: boolean
    }
  }>(), {
    data: () => ({
      is_new: true,
    }),
  }
)

const submit = () => {}
const on_close = () => {
  trigger.value?.close()
}
</script>

<template>
  <dialog ref="is_open" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold mb-4" v-if="title">{{ title }}</h3>
      <slot name="default" />
      <div class="modal-action">
        <slot name="footer" />
      </div>
    </div>
    <form method="dialog" class="modal-backdrop"></form>
  </dialog>
</template>

<script setup lang="ts">
const is_open = defineModel<HTMLDialogElement>()

defineProps<{
  title?: string
}>()
</script>

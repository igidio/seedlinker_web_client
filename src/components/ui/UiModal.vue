<template>
  <dialog ref="is_open" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold mb-4" v-if="title">{{ title }}</h3>
      <slot name="default" />
      <div class="modal-action">
        <slot name="footer">
          <form method="dialog" class="modal-backdrop">
            <button>{{ $t('close') }}</button>
          </form>
        </slot>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button />
    </form>
  </dialog>
</template>

<script setup lang="ts">
const is_open = defineModel<HTMLDialogElement>()

defineProps<{
  title?: string
}>()
</script>

<template>

  <dialog ref="is_open" class="modal">
    <div class="modal-box">
      <slot name="default"/>
    </div>
    <slot name="footer">
      <form method="dialog" class="modal-backdrop">
        <button>{{ $t('close') }}</button>
      </form>
    </slot>
  </dialog>
</template>

<script setup lang="ts">
//const modalRef = ref<HTMLDialogElement | null>(null)
const is_open = defineModel<HTMLDialogElement>()
</script>

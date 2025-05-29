<template>
  <div class="drawer">
    <input ref="element" id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label :for="element?.id" class="drawer-button" ref="drawer_ref" />
      <div @click="element!.checked = true">
        <slot name="trigger" />
      </div>
    </div>
    <div class="drawer-side">
      <label :for="element?.id" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="menu bg-base-200 text-base-content min-h-full w-80 pt-4 px-4">
        <slot name="default"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const element = defineModel<HTMLInputElement>()
</script>

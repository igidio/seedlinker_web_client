<template>
  <div class="dropdown-end">
    <button popovertarget="popover-1" class="cursor-pointer" style="anchor-name: --anchor-1">
      <slot name="default" />
    </button>

    <ul
      class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm mt-2"
      popover
      id="popover-1"
      style="position-anchor: --anchor-1"
    >
      <slot name="dropdown"/>
    </ul>
  </div>

</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

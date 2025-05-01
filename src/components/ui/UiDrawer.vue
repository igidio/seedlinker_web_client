<template>
  <div class="drawer">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <label for="my-drawer" class="drawer-button" ref="drawer_ref" />
      <div @click="toggleDrawer">
        <slot name="trigger"/>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <slot name="default">
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <!-- Sidebar content here -->
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'

const drawer_ref = useTemplateRef('drawer_ref')

function toggleDrawer() {
  const checkbox = document.getElementById('my-drawer') as HTMLInputElement
  checkbox.checked = true
}
</script>

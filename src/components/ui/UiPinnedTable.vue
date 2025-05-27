<template>
  <table class="table table-pin-rows bg-base-200 text-xs">
    <template v-for="section in elements" :key="section.label">
      <thead>
        <tr>
          <th>{{ section.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in section.items" :key="item">
          <td>{{ item }}</td>
        </tr>
      </tbody>
    </template>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  elements: {
    label: string
    items: string[]
  }[]
}>()
</script>

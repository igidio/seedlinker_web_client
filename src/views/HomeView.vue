<template>
  <div class="flex flex-col gap-4">
    <ConnectedDevices/>
    <hr/>
    <MyDevices/>
  </div>
</template>

<script setup lang="ts">
import ConnectedDevices from '@/components/project/home/ConnectedDevices.vue'
import MyDevices from '@/components/project/home/MyDevices.vue'
</script>

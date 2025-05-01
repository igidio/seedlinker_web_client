<template>
  <div>
    <ConnectedDevices/>
    {{ envs.server_url }}
    {{ $t('save') }}
  </div>
</template>

<script setup lang="ts">
import { envs } from '../config/envs.ts'
import ConnectedDevices from '@/components/project/home/ConnectedDevices.vue'
</script>

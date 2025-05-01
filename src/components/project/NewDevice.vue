<template>
<div>hola</div>
</template>

<script setup lang="ts">
import { device_instance } from '@/config/instances.ts'
import { get_public_ip } from '@/utils/public_ip.ts'
import { replace_dots_with_underscores } from '@/utils/conversion.ts'
import { onMounted } from 'vue'

onMounted(async () => {
  const public_ip = await get_public_ip()
  const ip = replace_dots_with_underscores(public_ip)
  await device_instance.get_current_devices(ip)
})

</script>

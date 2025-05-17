<template>
  <UiCard
    ><h2 class="card-title">
      <Icon icon="ph:hand-tap-bold" />
      {{ $t('device.manual.title') }}
    </h2>

    <div
      class="grid md:grid-cols-1 xl:grid-cols-2 gap-2"
      v-if="props.output_pines.output.length > 0"
    >
      <button
        class="btn btn-primary btn-block"
        v-for="(pin, index) in props.output_pines.output"
        :key="index"
      >
        {{ $t(`device.io.values.${pin.name}`) + ' ' + `(${pin.gpio})` }}
      </button>
    </div>
    <div v-else>
      <span class="label text-xs text-center inline-block">
        {{ $t('device.modal.condition.fields.output.empty') }}
      </span>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import type { Pins } from '@/interfaces'
import { Icon } from '@iconify/vue/dist/iconify.js'

const props = defineProps<{
  output_pines: {
    input: Pins[]
    output: Pins[]
  }
}>()
</script>

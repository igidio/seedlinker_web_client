<template>
  <div
    class="badge"
    :class="[
      `${props.color ? `badge-${props.color}` : ''} ${props.size ? `badge-${props.size}` : ''}`,
      {
        'badge-soft': soft,
        'badge-outline': outline,
        'badge-dash': dash,
        'badge-ghost': ghost,
      },
    ]"
    >{{ message }}</div
  >
</template>

<script setup lang="ts">
interface Props {
  message: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
  soft?: boolean
  outline?: boolean
  dash?: boolean
  ghost?: boolean
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  colors: 'primary',
  soft: false,
  outline: false,
  dash: false,
  ghost: false,
})
</script>

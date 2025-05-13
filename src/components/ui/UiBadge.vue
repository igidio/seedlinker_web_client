<template>
  <div
    class="badge"
    :class="[
      {
        'badge-soft': soft,
        'badge-outline': outline,
        'badge-dash': dash,
        'badge-ghost': ghost,
        'badge-primary': color === 'primary',
        'badge-secondary': color === 'secondary',
        'badge-accent': color === 'accent',
        'badge-neutral': color === 'neutral',
        'badge-info': color === 'info',
        'badge-success': color === 'success',
        'badge-warning': color === 'warning',
        'badge-error': color === 'error',
        'badge-xs': size === 'xs',
        'badge-sm': size === 'sm',
        'badge-md': size === 'md',
        'badge-lg': size === 'lg',
        'badge-xl': size === 'xl',
      },
    ]"
  >
    {{ message }}
  </div>
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

withDefaults(defineProps<Props>(), {
  size: 'md',
  colors: 'primary',
  soft: false,
  outline: false,
  dash: false,
  ghost: false,
})
</script>

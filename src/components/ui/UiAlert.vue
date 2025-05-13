<template>
  <div
    role="alert"
    class="alert"
    :class="[
      {
        'alert-soft': soft,
        'alert-outline': outline,
        'alert-dash': dash,
        'alert-ghost': ghost,
        'alert-primary': color === 'primary',
        'alert-secondary': color === 'secondary',
        'alert-accent': color === 'accent',
        'alert-neutral': color === 'neutral',
        'alert-info': color === 'info',
        'alert-success': color === 'success',
        'alert-warning': color === 'warning',
        'alert-error': color === 'error',
        'alert-xs': size === 'xs',
        'alert-sm': size === 'sm',
        'alert-md': size === 'md',
        'alert-lg': size === 'lg',
        'alert-xl': size === 'xl',
      },
    ]"
  >
    <Icon :icon="icon" v-if="icon" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'

interface Props {
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

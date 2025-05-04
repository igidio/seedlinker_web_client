<template>
  <span class="loading" :class="`loading-${ size } loading-${type} ${ color && 'text-'+color}`"/>

</template>

<script setup lang="ts">
interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  type?: 'ball' | 'bars' | 'ring' | 'dots' | 'spinner' | 'infinity'
  color?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  type: 'spinner',
})
</script>

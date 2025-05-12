<template>
  <Transition name="toast">
    <div class="toast toast-center transition-all z-100" v-if="toasts.length > 0">
      <TransitionGroup name="toast">
        <div class="alert transition-all" v-for="(toast, index) in toasts" :key="index"
          :class="[{
            'alert-soft': toast.soft,
            'alert-outline': toast.outline,
            'alert-dash': toast.dash,
            'alert-success': toast.type === 'success',
            'alert-error': toast.type === 'error',
            'alert-warning': toast.type === 'warning',
            'alert-info': toast.type === 'info',
          }]"
        >
          <Icon :icon="toast.icon" v-if="toast.icon"/>
          <span>{{ $t(toast.message) }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'
const configStore = useConfigStore()
const {toasts} = storeToRefs(configStore)
</script>

<style scoped>
.toast-enter-from,
.toast-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.25s ease all;
}
</style>

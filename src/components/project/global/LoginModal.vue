<template>
  <UiModal v-model="login_modal_state">
    <template v-slot:default>
      Debes iniciar sesión para continuar
    </template>
    <template v-slot:footer>
      <form method="dialog" class="modal-backdrop">
        <button>{{ $t('close') }}</button>
      </form>
    </template>
  </UiModal>
</template>
<script setup lang="ts">
import UiModal from '@/components/ui/UiModal.vue'
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'

const configStore = useConfigStore()
const { login_modal_state } = storeToRefs(configStore)
</script>

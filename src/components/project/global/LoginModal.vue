<template>
  <UiModal v-model="login_modal_state">
    <template v-slot:default>
      Debes iniciar sesión para continuar
    </template>
    <template v-slot:footer>
      <div @click="login_modal_state?.close" class="flex flex-row gap-2">
        <router-link :to="{ name: 'login' }" class="btn btn-ghost"
        >{{ $t('login.title') }}
        </router-link>
        <router-link :to="{ name: 'signup' }" class="btn btn-neutral"
        >{{ $t('signup.title') }}
        </router-link>
      </div>
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

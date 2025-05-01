<template>
  <div class="flex flex-row justify-between items-center mb-4">
    <router-link class="flex flex-row items-center gap-2" :to="{ name: 'home' }">
      <UiLogo :size="36" />
      <span class="font-bold text-3xl">Seedlinker</span>
    </router-link>


    <div v-if="is_authenticated">
    <UiDropdown>
      <UiAvatar/>
      <template #dropdown>
        <li>
          <a><Icon icon="ph:user-fill"/>Modificar perfil</a>
        </li>
        <li><button @click="configStore.logout"><Icon icon="ph:door-duotone"/>Cerrar sesión</button></li>
      </template>
    </UiDropdown>
    </div>

    <div class="flex flex-row items-center gap-2" v-else>
      <router-link :to="{ name: 'login'}" class="btn btn-ghost">{{ $t('login.title') }}</router-link>
      <router-link :to="{ name: 'signup'}" class="btn btn-neutral">{{ $t('signup.title') }}</router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import UiLogo from '@/components/ui/UiLogo.vue'
import UiAvatar from '@/components/ui/UiAvatar.vue'
import UiDropdown from '@/components/ui/UiDropdown.vue'
import { Icon } from '@iconify/vue'
import { useConfigStore } from '@/stores/config.store.ts'
import { storeToRefs } from 'pinia'



const configStore = useConfigStore()
const { is_authenticated } = storeToRefs(configStore)
</script>

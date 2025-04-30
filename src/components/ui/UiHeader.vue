<template>
  <div class="flex flex-row justify-between items-center mb-4">
    <router-link class="flex flex-row items-center gap-2" :to="{ name: 'home' }">
      <UiLogo :size="36" />
      <span class="font-bold text-3xl">Seedlinker</span>
    </router-link>

    <!--
        <div>
        <UiDropdown>
          <UiAvatar/>
          <template #dropdown>
            <li>
              <a><Icon icon="ph:user-fill"/>Modificar perfil</a>
            </li>
            <li><a><Icon icon="ph:door-duotone"/>Cerrar sesión</a></li>
          </template>
        </UiDropdown>
        </div>
        -->

    <div class="flex flex-row items-center gap-2">
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
</script>

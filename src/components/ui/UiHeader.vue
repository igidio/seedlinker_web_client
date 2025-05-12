<template>
  <div class="flex flex-row justify-between items-center mb-4 sticky top-0 z-50 py-4 bg-base-200 px-4 ">
    <MobileSidebar class="md:hidden w-fit" />

      <router-link class="flex flex-row items-center gap-2" :to="{ name: 'home' }">
        <UiLogo :size="36" />
        <span class="font-bold text-3xl">Seedlinker</span>
      </router-link>

    <div v-if="is_authenticated">
      <UiDropdown>
        <UiAvatar />
        <template #dropdown>
          <li>
            <a>
              <Icon icon="ph:user-fill" />
              {{ $t('profile') }}
            </a>
          </li>
          <li>
            <button @click="configStore.logout">
              <Icon icon="ph:door-duotone" />
              {{ $t('logout') }}
            </button>
          </li>
        </template>
      </UiDropdown>
    </div>

    <div v-else>
      <div class="hidden md:flex flex-row items-center gap-2">
        <router-link :to="{ name: 'login' }" class="btn btn-ghost"
          >{{ $t('login.title') }}
        </router-link>
        <router-link :to="{ name: 'signup' }" class="btn btn-primary"
          >{{ $t('signup.title') }}
        </router-link>
      </div>
      <div class="flex flex-row items-center gap-2 md:hidden">
        <UiDropdown>
          <button class="btn btn-ghost text-lg">
            <Icon icon="ph:sign-in-duotone" />
          </button>
          <template #dropdown>
            <li>
              <RouterLink to="login">
                {{ $t('login.title') }}
              </RouterLink>
            </li>
            <li>
              <RouterLink to="signup">
                {{ $t('signup.title') }}
              </RouterLink>
            </li>
          </template>
        </UiDropdown>
      </div>
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
import UiDrawer from '@/components/ui/UiDrawer.vue'
import MobileSidebar from '@/components/project/global/MobileSidebar.vue'
import ToggleLanguage from '@/components/project/global/ToggleLanguage.vue'

const configStore = useConfigStore()
const { is_authenticated } = storeToRefs(configStore)
</script>

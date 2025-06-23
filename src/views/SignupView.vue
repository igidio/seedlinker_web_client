<template>
  <div class="flex flex-col items-center gap-2 mb-4">
    <UiLogo :size="52"/>
    <span class="font-bold text-3xl">Seedlinker</span>
  </div>


  <div class="flex flex-row justify-center items-center ">
    <SignupForm/>
  </div>

  <div class="text-end mt-2">
    <i18n-t
      keypath="signup.login_redirection.text"
      tag="label"
      scope="global"
      for="signup.login_redirection.link"
      class="mt-1 text-xs"
    >
      <RouterLink to="login" class="font-bold"
      >{{ $t(`signup.login_redirection.link`) }}
      </RouterLink>
    </i18n-t>
  </div>
</template>
<script setup lang="ts">
import UiLogo from '@/components/ui/UiLogo.vue'
import SignupForm from '@/components/project/auth/SignupForm.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

document.title = t('signup.title')
</script>

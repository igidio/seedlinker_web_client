<template>
  <div class="flex flex-col items-center gap-2 mb-4">
    <UiLogo :size="52" />
    <span class="font-bold text-3xl">Seedlinker</span>
  </div>

  <div class="flex flex-row justify-center items-center w-[380px]">
    <LoginForm />
  </div>

  <div class="text-end mt-2">
    <i18n-t
      keypath="login.signup_redirection.text"
      scope="global"
      tag="label"
      for="login.signup_redirection.link"
      class="mt-1 text-xs"
    >
      <RouterLink to="signup" class="font-bold"
        >{{ $t(`login.signup_redirection.link`) }}
      </RouterLink>
    </i18n-t>
  </div>
</template>
<script setup lang="ts">
import LoginForm from '@/components/project/auth/LoginForm.vue'
import UiLogo from '@/components/ui/UiLogo.vue'
</script>

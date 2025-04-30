<template>
  <UiCard>
    <template #top> </template>
    <template #default>
      <div class="flex flex-col gap-2">
        <h2 class="font-black text-xl text-center">{{ $t('login.title') }}</h2>
        <p class="text-center">{{ $t('login.description') }}</p>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('login.fields.username') }}</legend>
          <input type="text" class="input w-full" />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('login.fields.password') }}</legend>
          <input type="password" class="input w-full" />
        </fieldset>
        <button class="btn btn-lg btn-primary block mt-2">{{ $t('login.button') }}</button>
        <i18n-t
          keypath="login.signup_redirection.text"
          tag="label"
          for="login.signup_redirection.link"
          class="text-end mt-1"
        >
          <RouterLink to="signup" class="font-bold"
            >{{ $t(`login.signup_redirection.link`) }}
          </RouterLink>
        </i18n-t>
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
</script>

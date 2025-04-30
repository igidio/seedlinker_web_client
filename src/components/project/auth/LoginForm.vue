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
        <button class="btn btn-lg btn-neutral block mt-2 flex flex-row"><Icon icon="ph:door-open-fill"/>{{ $t('login.button') }}</button>
        <div class="flex flex-row gap-2">
          <button class="btn btn-base-200 btn-sm w-1/2 block mt-2 flex flex-row"><Icon icon="ph:github-logo-fill" />{{ $t('login.button_github') }}</button>
          <button class="btn btn-lg btn-sm grow block mt-2 flex flex-row"><Icon icon="ph:google-logo-bold" />{{ $t('login.button_google') }}</button>
        </div>
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import { Icon } from '@iconify/vue'
</script>

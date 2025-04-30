<template>
  <UiCard>
    <template #default>
      <div class="flex flex-col gap-2">
        <h2 class="font-black text-xl text-center">{{ $t('signup.title') }}</h2>
        <p class="text-center">{{ $t('signup.description') }}</p>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('signup.fields.username') }}</legend>
          <input type="text" class="input w-full" />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('signup.fields.email') }}</legend>
          <input type="email" class="input w-full" />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('signup.fields.password') }}</legend>
          <input type="password" class="input w-full" />
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('signup.fields.confirm_password') }}</legend>
          <input type="password" class="input w-full" />
        </fieldset>

        <button class="btn btn-lg btn-neutral block mt-2 flex flex-row"><Icon icon="ph:door-open-fill"/>{{ $t('signup.button') }}</button>
        <i18n-t
          keypath="signup.terms_and_conditions.text"
          tag="label"
          for="signup.terms_and_conditions.text"
          class=" text-center"
        >
          <RouterLink to="signup" class="font-bold"
          >{{ $t(`signup.terms_and_conditions.link`) }}
          </RouterLink>
        </i18n-t>
      </div>
    </template>
  </UiCard>
</template>
<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
</script>

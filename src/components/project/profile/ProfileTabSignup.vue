<template>
  <label class="tab">
    <input type="radio" name="my_tabs_4" />
    <Icon icon="ph:key-bold" class="mr-2" />

    {{ $t('profile.sign_up.title') }}
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">
    <p class="text-xs">{{ $t('profile.sign_up.description') }}</p>

    <div class="flex flex-col sm:flex-row gap-2 justify-center mt-4">
      <button class="btn btn-soft">
        <Icon icon="ph:github-logo-bold" />
        {{ $t('profile.sign_up.button.github.true') }}
      </button>

      <button class="btn btn-soft">
        <Icon icon="ph:google-logo-bold" />
        {{ $t('profile.sign_up.button.google.true') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
</script>

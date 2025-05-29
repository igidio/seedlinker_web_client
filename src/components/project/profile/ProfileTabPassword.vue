<template>
  <label class="tab">
    <input type="radio" name="my_tabs_4" />
    <Icon icon="ph:password-bold" class="mr-2" />
    {{ $t('profile.password.title') }}
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
</script>

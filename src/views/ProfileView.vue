<template>
  <ContentHeader
    :elements="[
      { name: `${$t('home.title')}`, path: 'home', icon: 'ph:house-bold' },
      {
        name: `${$t('profile.title')}`,
        path: 'profile',
      },
    ]"
    :title="$t('profile.title')"
  />
  <div class="tabs tabs-lift max-w-[800px] place-self-center">
    <label class="tab">
      <input type="radio" name="my_tabs_4" checked />
      <Icon icon="ph:user-rectangle-bold" class="mr-2" />
      {{ $t('profile.user_info.title') }}
    </label>
    <div class="tab-content bg-base-100 border-base-300 p-6">Tab content 1</div>

    <label class="tab">
      <input type="radio" name="my_tabs_4" />
      <Icon icon="ph:password-bold" class="mr-2" />
      {{ $t('profile.password.title') }}
    </label>
    <div class="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div>

    <label class="tab">
      <input type="radio" name="my_tabs_4" />
      <Icon icon="ph:key-bold" class="mr-2" />

      {{ $t('profile.sign_up.title') }}
    </label>
    <div class="tab-content bg-base-100 border-base-300 p-6">Tab content 3</div>
  </div>
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import { Icon } from '@iconify/vue/dist/iconify.js'
</script>

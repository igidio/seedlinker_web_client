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
  <div class="tabs tabs-lift w-full lg:w-[800px] place-self-center">
    <ProfileTabUserinfo />
    <ProfileTabPassword />
    <ProfileTabSignup />

  </div>
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import ProfileTabPassword from '@/components/project/profile/ProfileTabPassword.vue';
import ProfileTabSignup from '@/components/project/profile/ProfileTabSignup.vue';
import ProfileTabUserinfo from '@/components/project/profile/ProfileTabUserinfo.vue';
</script>

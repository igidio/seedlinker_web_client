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
  <div class="tabs tabs-lift w-full lg:w-[800px] place-self-center" v-if="user">
    <ProfileTabUserinfo :user="user" v-if="user" />
    <ProfileTabPassword />
    <ProfileTabSignup :user="user" />
  </div>
</template>

<script setup lang="ts">
import ContentHeader from '@/components/project/global/ContentHeader.vue'
import ProfileTabPassword from '@/components/project/profile/ProfileTabPassword.vue'
import ProfileTabSignup from '@/components/project/profile/ProfileTabSignup.vue'
import ProfileTabUserinfo from '@/components/project/profile/ProfileTabUserinfo.vue'
import { useProfileComposable } from '@/composables/profile.composable'
import { useI18n } from 'vue-i18n'
import { provide } from 'vue'
const { t } = useI18n()

const profileComposable = useProfileComposable()
const { get_user, user } = profileComposable

provide('update_user', profileComposable.update_user)
provide('update_password', profileComposable.update_password)
provide('update_strategy', profileComposable.update_strategy)
provide('unlink_account', profileComposable.unlink_account)

await get_user()
document.title = t('profile.title')

</script>

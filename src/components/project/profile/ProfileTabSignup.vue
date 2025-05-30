<template>
  <label class="tab">
    <input type="radio" name="my_tabs_4" />
    <Icon icon="ph:key-bold" class="mr-2" />

    {{ $t('profile.sign_up.title') }}
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">
    <p class="text-xs">{{ $t('profile.sign_up.description') }}</p>

    <div class="flex flex-col sm:flex-row gap-2 justify-center mt-4">
      <button class="btn btn-soft" @click="link_google" v-if=!user.google_id>
        <Icon icon="ph:google-logo-bold" />
        {{ $t('profile.sign_up.button.google.true') }}
      </button>
      <button class="btn btn-error btn-soft" @click="unlink_google" v-else>
        <Icon icon="ph:google-logo-bold" />
        {{ $t('profile.sign_up.button.google.false') }}
      </button>
      <button class="btn btn-soft">
        <Icon icon="ph:github-logo-bold" />
        {{ $t('profile.sign_up.button.github.true') }}
      </button>
    </div>

    <p v-if="error_message" class="text-xs text-error mt-2 text-center">{{ $t(error_message) }}</p>
  </div>
</template>

<script setup lang="ts">
import type { UserInterface } from '@/interfaces'
import { api_client } from '@/utils/axios'
import { get_cookie } from '@/utils/cookie'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { inject, ref } from 'vue'

const error_message = ref<string | null>(null)
const update_strategy = inject('update_strategy') as (
  strategy: 'google' | 'github',
  id: 'string',
) => void
window.addEventListener('message', (event) => {
  handleMessage(event, 'google')
})

const link_google = async () => {
  const googleAuthUrl = `http://192.168.0.99:8000/service/auth/google?next=${get_cookie('access_token')}`
  const width = 500
  const height = 600
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  window.open(
    googleAuthUrl,
    'GoogleAuth',
    `width=${width},height=${height},top=${top},left=${left}`,
  )
}

const handleMessage = (event: MessageEvent, method: string) => {
  console.log(method, event.data)
  const data = event.data
  if (data['detail']) {
    error_message.value = data['detail']
  } else if (data['strategy'] && data['id']) {
    update_strategy(data['strategy'], data['id'])
  }
}

// const unlink_google = async () => {
//   error_message.value = null
//   try {
//     await api_client.delete('/service/auth/google', {
//       headers: {
//         Authorization: `Bearer ${get_cookie('access_token')}`,
//       },
//     })
//     update_strategy('google', '')
//   } catch (error) {
//     console.error('Error unlinking Google account:', error)
//     error_message.value = 'profile.sign_up.error.unlink_google'
//   }
// }

defineProps<{
  user: UserInterface
}>()
</script>

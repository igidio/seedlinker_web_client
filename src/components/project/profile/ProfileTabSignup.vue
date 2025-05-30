<template>
  <label class="tab">
    <input type="radio" name="my_tabs_4" />
    <Icon icon="ph:key-bold" class="mr-2" />

    {{ $t('profile.sign_up.title') }}
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">
    <p class="text-xs">{{ $t('profile.sign_up.description') }}</p>

    <div class="flex flex-col sm:flex-row gap-2 justify-center mt-4">
      <button class="btn btn-soft" @click="link_account('google')" v-if="!user.google_id" :disabled="is_loading">
        <Icon icon="ph:google-logo-bold" />
        {{ $t('profile.sign_up.button.google.true') }}
      </button>
      <button class="btn btn-error btn-soft" @click="unlink('google')" v-else :disabled="is_loading">
        <Icon icon="ph:google-logo-bold" />
        {{ $t('profile.sign_up.button.google.false') }}
      </button>
      <button class="btn btn-soft" :disabled="is_loading" v-if="!user.github_id" @click="link_account('github')">
        <Icon icon="ph:github-logo-bold" />
        {{ $t('profile.sign_up.button.github.true') }}
      </button>
      <button class="btn btn-error btn-soft" @click="unlink('github')" v-else :disabled="is_loading">
        <Icon icon="ph:github-logo-bold" />
        {{ $t('profile.sign_up.button.github.false') }}
      </button>
    </div>

    <p v-if="error_message" class="text-xs text-error mt-2 text-center">{{ $t(error_message) }}</p>
  </div>
</template>

<script setup lang="ts">
import type { UserInterface } from '@/interfaces'
import { useConfigStore } from '@/stores/config.store'
import { get_cookie } from '@/utils/cookie'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { inject, ref } from 'vue'

const { generate_toast } = useConfigStore()
const error_message = ref<string | null>(null)
const update_strategy = inject('update_strategy') as (
  strategy: 'google' | 'github',
  id: 'string',
) => void
const unlink_account = inject('unlink_account') as (strategy: "google" | "github") => Promise<void>
const is_loading = ref(false)

const link_account = async (strategy: 'google'|'github') => {
  const auth_url = `http://192.168.0.99:8000/service/auth/${strategy}?next=${get_cookie('access_token')}`
  const width = 500
  const height = 600
  const left = window.screen.width / 2 - width / 2
  const top = window.screen.height / 2 - height / 2

  window.open(
    auth_url,
    'Link Account',
    `width=${width},height=${height},top=${top},left=${left}`,
  )
}

const handleMessage = (event: MessageEvent) => {
  const data = event.data
  if (data['detail']) {
    error_message.value = data['detail']
  } else if (data['strategy'] && data['id']) {
    update_strategy(data['strategy'], data['id'])
    generate_toast({
      type: 'success',
      message: 'profile.success',
    })
  }
}

const unlink = async (strategy: "google"|"github") => {
  is_loading.value = true
  await unlink_account(strategy)
    .then(() => {
      error_message.value = null
    })
    .catch((error) => {
      console.error('Error unlinking Google account:', error)
      error_message.value = 'error.oauth.unlink_google'
    })
    .finally(() => {
      is_loading.value = false
    })
}

defineProps<{
  user: UserInterface
}>()


window.removeEventListener('message', handleMessage)
window.addEventListener('message', (event) => {
  handleMessage(event)
})
</script>

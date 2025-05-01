<template>
  <UiCard>
    <template #top></template>
    <template #default>
      <form class="flex flex-col gap-2" @submit.prevent="submit">
        <h2 class="font-black text-xl text-center">{{ $t('login.title') }}</h2>
        <p class="text-center">{{ $t('login.description') }}</p>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('login.fields.username') }}</legend>
          <input
            type="text"
            class="input w-full"
            v-model="form.username"
            @input="validate_inputs"
            autocomplete="off"
          />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('login.fields.password') }}</legend>
          <input
            type="password"
            class="input w-full"
            v-model="form.password"
            @input="validate_inputs"
            autocomplete="new-password"
          />
        </fieldset>
        <p class="text-error text-center" v-if="error_message">{{ $t(error_message) }}</p>
        <button type="submit" class="btn btn-lg btn-neutral block mt-2 flex flex-row" :disabled="is_loading">
          <Icon icon="ph:door-open-fill" />
          {{ $t('login.button') }}
        </button>
        <div class="flex flex-row gap-2">
          <button class="btn btn-base-200 btn-sm w-1/2 block mt-2 flex flex-row" type="button">
            <Icon icon="ph:github-logo-fill" />
            {{ $t('login.button_github') }}
          </button>
          <button class="btn btn-lg btn-sm grow block mt-2 flex flex-row" type="button">
            <Icon icon="ph:google-logo-bold" />
            {{ $t('login.button_google') }}
          </button>
        </div>
      </form>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import { Icon } from '@iconify/vue'
import axios, { AxiosError } from 'axios'
import { reactive, ref } from 'vue'
import { z } from 'zod'
import { api_client } from '@/utils/axios.ts'

const form = reactive({
  username: '',
  password: '',
})
const schema = z.object({
  username: z.string().min(1, { message: 'error.input.username.required' }),
  password: z.string().min(1, { message: 'error.input.password.required' }),
})
const error_message = ref<string | null>(null)
const is_loading = ref(false)

const validate_inputs = () => {
  const result = schema.safeParse(form)
  if (!result.success) {
    error_message.value = result.error.errors[0].message
    return
  } else {
    error_message.value = null
  }
}

const submit = async () => {
  is_loading.value = true
  validate_inputs()
  if (error_message.value) {
    is_loading.value = false
    return
  }
  await api_client
    .post(`service/auth/login`, {
      username_or_email: form.username,
      password: form.password,
    })
    .then((response) => {
      console.log('Login successful')
      console.log(response)
    })
    .catch((e: AxiosError) => {
      error_message.value = (e.response?.data as { detail?: string })?.detail || null
    })
    .finally(() => {
      is_loading.value = false
    })
}
</script>

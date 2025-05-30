<template>
  <label class="tab">
    <input type="radio" name="my_tabs_4" />
    <Icon icon="ph:password-bold" class="mr-2" />
    {{ $t('profile.password.title') }}
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">
    <p class="text-xs">{{ $t('profile.password.description') }}</p>
    <form class="flex flex-col gap-2" @submit.prevent="submit">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('profile.password.fields.current_password') }}
        </legend>
        <input
          type="password"
          class="input w-full"
          v-model="form.current_password"
          @input="validate_inputs"
          autocomplete="current-password"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('profile.password.fields.new_password') }}
        </legend>
        <input
          type="password"
          class="input w-full"
          v-model="form.new_password"
          @input="validate_inputs"
          autocomplete="new-password"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('profile.password.fields.confirm_new_password') }}
        </legend>
        <input
          type="password"
          class="input w-full"
          v-model="form.confirm_new_password"
          @input="validate_inputs"
          autocomplete="new-password"
        />
      </fieldset>
      <p v-if="error_message" class="text-xs text-error">{{ $t(error_message) }}</p>

      <div class="flex flex-row justify-end">
        <button type="submit" class="btn btn-primary mt-2 flex flex-row items-center w-fit" :disabled="is_loading || !!error_message">
          <Icon icon="ph:floppy-disk-back-bold" />
          {{ $t('profile.password.button') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { user_password_schema } from '@/schemas'
import { capture_detail_error } from '@/utils/axios'
import { Icon } from '@iconify/vue/dist/iconify.js'
import type { AxiosError } from 'axios'
import { inject, reactive, ref } from 'vue'

const is_loading = ref(false)
const error_message = ref<string | null>(null)
const update_password = inject('update_password') as (data: {
  current_password: string
  new_password: string
}) => Promise<void>

const form = reactive({
  current_password: '',
  new_password: '',
  confirm_new_password: '',
})

const submit = async () => {
  is_loading.value = true
  validate_inputs()
  if (error_message.value) {
    is_loading.value = false
    return
  }
  const data = {
    current_password: form.current_password,
    new_password: form.new_password,
  }
  await update_password(data)
    .then(() => {
      error_message.value = null
    })
    .catch((error: AxiosError) => {
      console.error('Error updating user:', error)
      error_message.value = capture_detail_error(error)
    })
    .finally(() => {
      is_loading.value = false
    })
}
const validate_inputs = () => {
  const result = user_password_schema.safeParse(form)
  if (!result.success) {
    error_message.value = result.error.errors[0].message
    return
  } else {
    error_message.value = null
  }
}
</script>

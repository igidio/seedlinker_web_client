<template>
  <label class="tab">
    <input type="radio" name="my_tabs_4" checked />
    <Icon icon="ph:user-rectangle-bold" class="mr-2" />
    {{ $t('profile.user_info.title') }}
  </label>

  <div class="tab-content bg-base-100 border-base-300 p-6">
    <p class="text-xs">{{ $t('profile.user_info.description') }}</p>
    <form class="flex flex-col gap-2" @submit.prevent="submit">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('profile.user_info.fields.username') }}</legend>
        <input type="text" class="input w-full" v-model="form.username" @input="validate_inputs" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">{{ $t('profile.user_info.fields.email') }}</legend>
        <input type="text" class="input w-full" v-model="form.email" @input="validate_inputs" />
      </fieldset>
      <p v-if="error_message" class="text-xs text-error">{{ $t(error_message) }}</p>
      <div class="flex flex-row justify-end">
        <button type="submit" class="btn btn-primary mt-2 flex flex-row items-center w-fit" :disabled="is_loading">
          <Icon icon="ph:floppy-disk-back-bold" />
          {{ $t('profile.user_info.button') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { UserInterface } from '@/interfaces'
import { user_email_schema } from '@/schemas'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { inject, onMounted, reactive, ref } from 'vue'

const error_message = ref<string | null>(null)
const is_loading = ref(false)
const update_user = inject('update_user') as (data: Partial<UserInterface>) => Promise<void>

const validate_inputs = () => {
  const result = user_email_schema.safeParse(form)
  if (!result.success) {
    error_message.value = result.error.errors[0].message
    return
  } else {
    error_message.value = null
  }
}

const set_defaults = () => {
  form.username = props.user.username
  form.email = props.user.email
}

const props = defineProps<{ user: UserInterface }>()

onMounted(() => {
  set_defaults()
})

const form = reactive({
  username: '',
  email: '',
})

const submit = async () => {
  is_loading.value = true
  validate_inputs()
  if (error_message.value) {
    is_loading.value = false
    return
  }
  const data = {
    username: form.username,
    email: form.email,
  }
  await update_user(data).then(() => {
    error_message.value = null
  })
  .catch((error: Error) => {
    console.error('Error updating user:', error)
    error_message.value = 'error.update.user'
  }).finally(() => {
    is_loading.value = false
  })
}
</script>

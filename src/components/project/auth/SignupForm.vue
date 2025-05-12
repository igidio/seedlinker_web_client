<template>
  <UiCard>
    <template #default>
      <form class="flex flex-col gap-2" autocomplete="off" @submit.prevent="submit">
        <h2 class="font-black text-xl text-center">{{ $t('signup.title') }}</h2>
        <p class="text-center">{{ $t('signup.description') }}</p>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('signup.fields.username') }}</legend>
          <input type="text" class="input w-full" autocomplete="username" v-model="form.username" @input="validate_inputs"/>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('signup.fields.email') }}</legend>
          <input type="email" class="input w-full" autocomplete="email"  v-model="form.email" @input="validate_inputs"/>
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('signup.fields.password') }}</legend>
          <input type="password" class="input w-full" autocomplete="new_password" v-model="form.password" @input="validate_inputs"/>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">{{ $t('signup.fields.confirm_password') }}</legend>
          <input type="password" class="input w-full" autocomplete="new_password" v-model="form.confirm_password" @input="validate_inputs"/>
        </fieldset>
        <p class="text-error text-center" v-if="error_message">{{ $t(error_message) }}</p>
        <button class="btn btn-lg btn-primary block mt-2 flex flex-row" :disabled="is_loading"><Icon icon="ph:door-open-fill"/>{{ $t('signup.button') }}</button>
        <i18n-t
          keypath="signup.terms_and_conditions.text"
          tag="label"
          scope="global"
          for="signup.terms_and_conditions.text"
          class=" text-center"
        >
          <RouterLink to="signup" class="font-bold"
          >{{ $t(`signup.terms_and_conditions.link`) }}
          </RouterLink>
        </i18n-t>
      </form>
    </template>
  </UiCard>
</template>
<script setup lang="ts">
import UiCard from '@/components/ui/UiCard.vue'
import { Icon } from '@iconify/vue'
import { reactive, ref } from 'vue'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { api_client } from '@/utils/axios.ts'

const error_message = ref<string | null>(null)
const is_loading = ref(false)
const form = reactive({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
})

const schema = z.object({
  username: z.string({ required_error: 'error.input.username.required' }).min(3, { message: 'error.input.username.min_length' }),
  email: z.string({ required_error: 'error.input.email.required' }).email({ message: 'error.input.email.invalid' }),
  password: z.string({ required_error: 'error.input.password.required' }).min(8, { message: 'error.input.password.min_length' }),
  confirm_password: z.string({ required_error: 'error.input.password.required' }).min(8, { message: 'error.input.password.min_length' }),
}).refine((data) => data.password === data.confirm_password, {
  message: 'error.input.password_compare'
})

const validate_inputs = () => {
  const result = schema.safeParse(form)
  if (!result.success) {
    error_message.value = result.error.errors[0].message
    return true
  } else {
    error_message.value = null
    return false
  }
}

const submit = async () => {
  is_loading.value = true
  if (validate_inputs()) {
    is_loading.value = false
    return
  }

  try {
    const response = await api_client.post('/service/auth/signup', form)
    console.log(response.data)
  } catch (e) {
    if (e instanceof AxiosError) {
      error_message.value = (e.response?.data as { detail?: string })?.detail || null    }
  }
  finally {
    is_loading.value = false
  }
}
</script>

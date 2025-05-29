<template>
  <label class="tab">
    <input type="radio" name="my_tabs_4" />
    <Icon icon="ph:password-bold" class="mr-2" />
    {{ $t('profile.password.title') }}
  </label>
  <div class="tab-content bg-base-100 border-base-300 p-6">
    <p class="text-xs">{{ $t('profile.password.description') }}</p>
    <form class="flex flex-col gap-2" @submit-prevent="submit">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('profile.password.fields.current_password') }}
        </legend>
        <input
          type="text"
          class="input w-full"
          v-model="form.current_password"
          @input="validate_inputs"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('profile.password.fields.new_password') }}
        </legend>
        <input
          type="text"
          class="input w-full"
          v-model="form.current_password"
          @input="validate_inputs"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          {{ $t('profile.password.fields.confirm_new_password') }}
        </legend>
        <input
          type="text"
          class="input w-full"
          v-model="form.confirm_new_password"
          @input="validate_inputs"
        />
      </fieldset>
      <div class="flex flex-row justify-end">
        <button type="submit" class="btn btn-primary mt-2 flex flex-row items-center w-fit">
          <Icon icon="ph:floppy-disk-back-bold" />
          {{ $t('profile.password.button') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { reactive } from 'vue'

const form = reactive({
  current_password: '',
  new_password: '',
  confirm_new_password: '',
})

const submit = () => {
  // Handle form submission logic here
  console.log('Form submitted')
}
const validate_inputs = () => {
  // Handle input validation logic here
  console.log('Inputs validated')
}
</script>

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useConfigStore = defineStore('config', () => {
  const { locale } = useI18n()
  const login_modal_state = ref<HTMLDialogElement>()
  const show_login_modal = () => {
    if (login_modal_state.value) {
      login_modal_state.value.showModal()
    }
  }
  const set_language = (value: 'en' | 'es') => {
    locale.value = value
    localStorage.setItem('language', locale.value)
  }

  const get_language = () => {
    const language = localStorage.getItem('language')
    if (language) {
      locale.value = language as 'en' | 'es'

    } else {
      locale.value = 'en'
    }
  }

  return {
    login_modal_state,
    locale,
    show_login_modal,
    set_language,
    get_language,
  }
})

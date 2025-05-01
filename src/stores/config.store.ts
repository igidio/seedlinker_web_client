import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { get_cookie, remove_cookie } from '@/utils/cookie.ts'

export const useConfigStore = defineStore('config', () => {
  const { locale } = useI18n()
  const login_modal_state = ref<HTMLDialogElement>()
  const is_authenticated = ref(false)

  if (!!get_cookie('token')) {
    is_authenticated.value = true
  }

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

  const logout = () => {
    remove_cookie('token')
    window.location.replace('/')
  }

  return {
    login_modal_state,
    locale,
    logout,
    show_login_modal,
    set_language,
    get_language,
    is_authenticated
  }
})

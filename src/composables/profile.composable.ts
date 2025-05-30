import type { UserInterface } from '@/interfaces'
import { useConfigStore } from '@/stores/config.store'
import { api_client } from '@/utils/axios'
import { ref } from 'vue'

const { generate_toast } = useConfigStore()

export const useProfileComposable = () => {
  const user = ref({} as UserInterface)
  const loading = ref(false)

  const get_user = async () => {
    loading.value = true
    try {
      const response = await api_client.get<UserInterface>('/service/auth/info')
      user.value = await response.data
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      loading.value = false
    }
  }

  const update_user = async (data: Partial<UserInterface>) => {
    await api_client.post('/service/auth/update/user', data).then((response) => {
      console.log('User profile updated:', response.data)
      user.value = { ...user.value, ...data }
      generate_toast({
        type: 'success',
        message: 'profile.success',
      })
    })
  }

  const update_password = async (data: { current_password: string; new_password: string }) => {
    await api_client.post('/service/auth/update/password', data).then((response) => {
      generate_toast({
        type: 'success',
        message: 'profile.success',
      })
    })
  }

  const update_strategy = (strategy: 'google' | 'github', id: 'string') => {
    user.value[strategy === 'google' ? 'google_id' : 'github_id'] = id
  }

  const unlink_account = async (strategy: 'google' | 'github') => {
    await api_client.post(`/service/auth/${strategy}/unlink`, { strategy }).then((response) => {
      user.value[strategy === 'google' ? 'google_id' : 'github_id'] = undefined
      generate_toast({
        type: 'success',
        message: `profile.unlink`,
      })
    })
  }

  return {
    user,
    loading,
    get_user,
    update_user,
    update_password,
    update_strategy,
    unlink_account,
  }
}

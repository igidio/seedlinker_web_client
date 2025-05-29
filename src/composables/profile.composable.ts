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
      console.log('User profile fetched:', user.value)
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

  return {
    user,
    loading,
    get_user,
    update_user,
  }
}

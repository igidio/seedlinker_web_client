import type { DeviceInterface } from '@/interfaces'
import { ref } from 'vue'
import { api_client } from '@/utils/axios.ts'
import type { Device } from '@/classes/device.class.ts'
import { useConfigStore } from '@/stores/config.store.ts'

const { generate_toast } = useConfigStore()

export const useDeviceComposable = () => {
  const device = ref<DeviceInterface | null>(null)

  const set_device = (new_device: DeviceInterface) => {
    device.value = new_device
  }

  const update_data = async (new_data: Partial<DeviceInterface>) => {
    if (!device.value) return
    await api_client
      .patch(`/devices/${device.value?.uuid}`, new_data)
      .then(() => {
        device.value = { ...device.value as DeviceInterface, ...new_data }
        generate_toast({
          message: 'device.alert.edit',
          type: 'success',
        })
      })
      .catch((error) => {
        console.error('Error updating device:', error)
      })
  }

  return {
    device,
    set_device,
    update_data,
  }
}

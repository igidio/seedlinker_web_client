import type { DeviceInterface, PinValuesInterface } from '@/interfaces'
import { computed, ref } from 'vue'
import { api_client } from '@/utils/axios.ts'
import type { Device } from '@/classes/device.class.ts'
import { useConfigStore } from '@/stores/config.store.ts'
import type { AxiosError } from 'axios'
import { pin_values } from '@/data/device.data.ts'

const { generate_toast } = useConfigStore()

export const useDeviceComposable = () => {
  const device = ref<DeviceInterface | null>(null)
  const pin_values_by_device = ref<PinValuesInterface[]>([])

  const set_device = (new_device: DeviceInterface) => {
    device.value = new_device
    pin_values_by_device.value = pin_values[device.value.type as 'ESP8266'|'ESP32']
  }

  const add_pin = async (pin: Partial<DeviceInterface['pins'][0]>) => {
    await api_client
      .post(`/devices/${device.value?.uuid}/pin`, pin)
      .then((response) => {
        generate_toast({
          type: 'success',
          message: 'device.modal.io.submit',
        })
        device.value?.pins.push(response.data)
      })
      .catch((e: AxiosError) => {
        throw e
        //error_message.value = (e.response?.data as { detail?: string })?.detail || null
      })
  }

  const update_data = async (new_data: Partial<DeviceInterface>) => {
    if (!device.value) return
    await api_client
      .patch(`/devices/${device.value?.uuid}`, new_data)
      .then(() => {
        device.value = { ...(device.value as DeviceInterface), ...new_data }
        generate_toast({
          message: 'device.alert.edit',
          type: 'success',
        })
      })
      .catch((error) => {
        console.error('Error updating device:', error)
      })
  }

  const used_pins = computed(() => {
    if (!device.value) return []
    return [...new Set(device.value?.pins.map(pin => pin.pin))]
  })

  const available_pins = computed(() => {
    return pin_values_by_device.value.filter((pin) => {
      return !used_pins.value.includes(pin.value)
    })
  })

  return {
    device,
    set_device,
    update_data,
    add_pin,
    used_pins,
    available_pins
  }
}

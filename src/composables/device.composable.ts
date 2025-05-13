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
    pin_values_by_device.value = pin_values[device.value.type as 'ESP8266' | 'ESP32']
  }

  const delete_device = async (uuid: Device) => {}

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

  const update_pin = async (pin: Partial<DeviceInterface['pins'][0]>, id: string) => {
    await api_client
      .patch(`/devices/${device.value?.uuid}/pin/${id}`, pin)
      .then((response) => {
        generate_toast({
          type: 'success',
          message: 'device.modal.io.submit',
        })
        const index = device.value?.pins.findIndex((p) => p._id?.$oid === id)
        if (index !== undefined && index !== -1) {
          device.value!.pins[index] = response.data
        }
      })
      .catch((e: AxiosError) => {
        throw e
        //error_message.value = (e.response?.data as { detail?: string })?.detail || null
      })
  }

  const delete_pin = async (id: string) => {
    await api_client
      .delete(`/devices/${device.value?.uuid}/pin/${id}`)
      .then(() => {
        generate_toast({
          type: 'success',
          message: 'device.modal.io.submit',
        })
        const index = device.value?.pins.findIndex((p) => p._id?.$oid === id)
        if (index !== undefined && index !== -1) {
          device.value!.pins.splice(index, 1)
        }
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
    return [...new Set(device.value?.pins.map((pin) => pin.pin))]
  })

  const available_pins = computed(() => {
    return pin_values_by_device.value.filter((pin) => {
      return !used_pins.value.includes(pin.value)
    })
  })

  const device_pins_by_type = computed(() => {
    const input_devices = device.value?.pins.filter((pin) => {
      return pin.type === 'input'
    })
    const output_devices = device.value?.pins.filter((pin) => {
      return pin.type === 'output'
    })
    return {
      input: input_devices,
      output: output_devices,
    }
  })

  return {
    device,
    set_device,
    update_data,
    update_pin,
    add_pin,
    delete_pin,
    used_pins,
    available_pins,
    device_pins_by_type,
  }
}

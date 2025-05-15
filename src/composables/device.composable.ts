import type {
  ConditionDtoInterface,
  DeviceInterface,
  PinValuesInterface,
  SensorConditionInterface,
  TimeConditionInterface,
} from '@/interfaces'
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
        if (device.value?.pins === undefined) device.value!.pins = []
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
        const index = device.value?.pins.findIndex((p) => p.id === id)
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
        const index = device.value?.pins.findIndex((p) => p.id === id)
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

  const delete_data = async () => {
    await api_client
      .delete(`/devices/${device.value?.uuid}`)
      .then(() => {
        generate_toast({
          message: 'device.alert.delete',
          type: 'success',
        })
      })
      .catch((error) => {
        console.error('Error deleting device:', error)
      })
  }

  const create_condition = async (data: Partial<ConditionDtoInterface>) => {
    await api_client
      .post<
        SensorConditionInterface | TimeConditionInterface
      >(`/devices/${device.value?.uuid}/condition`, data)
      .then((result) => {
        generate_toast({
          //TODO: add message
          message: 'Nueva condicion creada',
          type: 'success',
        })
        if (!device.value?.conditions) {
          device.value!.conditions = {
            by_time: [],
            by_sensor: [],
          }
        }
        if (data.type === 'time') {
          if (!device.value?.conditions.by_time) device.value!.conditions.by_time = []
          device.value?.conditions.by_time.push(result.data as TimeConditionInterface)
        } else if (data.type === 'sensor') {
          if (!device.value?.conditions.by_sensor) device.value!.conditions.by_sensor = []
          device.value?.conditions.by_sensor.push(result.data as SensorConditionInterface)
        }
      })
  }

  const update_condition = async (data: Partial<ConditionDtoInterface>, id: string) => {
    await api_client
      .patch<
        TimeConditionInterface | SensorConditionInterface
      >(`/devices/${device.value?.uuid}/condition/${id}`, data)
      .then((result) => {
        generate_toast({
          //TODO: add message
          message: 'Agregar esto',
          type: 'success',
        })
        if (data.type === 'time') {
          const index = device.value?.conditions.by_time.findIndex(
            (condition) => condition.id === id,
          )
          if (index !== undefined && index !== -1) {
            device.value!.conditions.by_time[index] = result.data as TimeConditionInterface
          }
        } else if (data.type === 'sensor') {
          const index = device.value?.conditions.by_sensor.findIndex(
            (condition) => condition.id === id,
          )
          if (index !== undefined && index !== -1) {
            device.value!.conditions.by_sensor[index] = result.data as SensorConditionInterface
          }
        }
      })
  }

  const delete_condition = async (id: string, mode: 'time' | 'sensor') => {
    await api_client.delete(`/devices/${device.value?.uuid}/condition/${id}`).then(() => {
      generate_toast({
        // TODO: add message
        message: 'Eliminar esto',
        type: 'success',
      })
      const index = device.value?.conditions[mode === 'time' ? 'by_time' : 'by_sensor'].findIndex(
        (condition) => condition.id === id,
      )
      if (index !== undefined && index !== -1) {
        device.value!.conditions[mode === 'time' ? 'by_time' : 'by_sensor'].splice(index, 1)
      }
    })
  }

  const used_pins = computed(() => {
    if (!device.value || !device.value.pins) return []
    return [...new Set(device.value?.pins.map((pin) => pin.pin))]
  })

  const available_pins = computed(() => {
    return pin_values_by_device.value.filter((pin) => {
      return !used_pins.value.includes(pin.value)
    })
  })

  const device_pins_by_type = computed(() => {
    if (!device.value?.pins) return { input: [], output: [] }
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
    delete_data,
    create_condition,
    update_condition,
    delete_condition,
  }
}

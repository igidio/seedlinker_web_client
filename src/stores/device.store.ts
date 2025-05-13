import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { get_public_ip } from '@/utils/public_ip.ts'
import { create_socket } from '@/utils/socket.ts'
import { replace_dots_with_underscores } from '@/utils/conversion.ts'
import { device_instance } from '@/config/instances.ts'
import type { current_devices_interface } from '@/interfaces'
import { get_client_info } from '@/utils/device_info.ts'
import type { DeviceInterface } from '../interfaces/device.interface'
import { api_client } from '@/utils/axios'

export const useDeviceStore = defineStore('device', () => {
  const devices = ref<DeviceInterface[]>([])
  const public_ip = ref<string>('')
  const socket = ref<WebSocket | null>(null)
  const current_devices = ref<current_devices_interface>({})
  const is_loading_connection = ref(true)
  const show_error = ref(false)

  const set_public_ip = async () => {
    public_ip.value = replace_dots_with_underscores(await get_public_ip())
  }

  const get_current_devices = async () => {
    current_devices.value = {}

    show_error.value = false
    is_loading_connection.value = true
    try {
      current_devices.value = await device_instance.get_current_devices(public_ip.value)
      if (current_devices.value) {
        is_loading_connection.value = false
      }
    } catch (e) {
      show_error.value = true
      console.error(e)
    }
  }

  const initialize = async () => {
    show_error.value = false
    try {
      await set_public_ip()
    } catch (e) {
      show_error.value = true
      console.error(e)
    }

    socket.value = create_socket(public_ip.value)

    socket.value.onopen = async () => {
      socket.value?.send(
        JSON.stringify({
          action: 'register_client',
          data: {
            info: get_client_info(),
          },
        }),
      )
    }

    socket.value.onmessage = async () => {
      await get_current_devices()
    }
  }

  const connected_by_types = computed(() => {
    const connected = Object.values(current_devices.value).map((values) => ({
      ...values,
    }))
    return {
      devices: connected.filter((connected) => connected.type === 'device'),
      clients: connected.filter((connected) => connected.type === 'client'),
    }
  })

  const clients_connected = computed(() => {
    return connected_by_types.value.clients.map((e) => e.client?.info)
  })

  const fetch_data = async () => {
    await api_client
      .get<DeviceInterface[]>('/devices')
      .then((response) => {
        devices.value = response.data
      })
      .catch((error) => {
        console.error('Error fetching devices:', error)
      })
  }

  return {
    socket,
    initialize,
    current_devices,
    connected_by_types,
    is_loading_connection,
    show_error,
    clients_connected,
    get_current_devices,
    devices,
    fetch_data,
  }
})

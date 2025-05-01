import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { get_public_ip } from '@/utils/public_ip.ts'
import { create_socket } from '@/utils/socket.ts'
import { replace_dots_with_underscores } from '@/utils/conversion.ts'
import { device_instance } from '@/config/instances.ts'
import type { current_devices_interface } from '@/interfaces'
import { get_client_info } from '@/utils/device_info.ts'

export const useDeviceStore = defineStore('device', () => {
  const devices = ref(0)
  const public_ip = ref<string>('')
  const socket = ref<WebSocket | null>(null)
  const current_devices = ref<current_devices_interface>({})

  const set_public_ip = async () => {
    public_ip.value = replace_dots_with_underscores(await get_public_ip())
  }

  const initialize = async () => {
    await set_public_ip()
    socket.value = create_socket(public_ip.value);
    socket.value.onopen = async () => {
      socket.value!.send(JSON.stringify({ action: "register_client", data: {
        info: get_client_info()
      } }));
      current_devices.value = await device_instance.get_current_devices(public_ip.value)
      console.log(current_devices.value)
    }
    socket.value.onmessage = async (event) => {
      current_devices.value = await device_instance.get_current_devices(public_ip.value)
      console.log(await device_instance.get_current_devices(public_ip.value));
    }
  }

  const connected_by_types = computed(() => {
    const connected = Object.values(current_devices.value).map((values) => ({
      ...values,
    }))
    return ({
      devices: connected.filter((connected) => connected.type === "device"),
      clients: connected.filter((connected) => connected.type === "client"),
    })
  })

  return {
    devices,
    socket,
    initialize,
    current_devices,
    connected_by_types
  }
})

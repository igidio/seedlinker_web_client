import { Device } from '@/classes/device.class.ts'
import { envs } from '@/config/envs.ts'

export const device_instance = new Device({
  server_direction: envs.server_url,
  group: 'clients',
})

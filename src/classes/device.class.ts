import axios from 'axios'
import type { current_devices_interface } from '@/interfaces'

export class Device {
  private readonly server_direction: string

  constructor({ server_direction, group }: { server_direction: string; group: string }) {
    this.server_direction = server_direction}

  async get_current_devices(group_address: string) {
    return (await axios.get<current_devices_interface>(`${this.server_direction}/ws/group/${group_address}/clients`)).data
  }
}

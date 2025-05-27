export interface GraphInterface {
  by_device_type: ByDeviceType[]
  by_action_type: ByActionType[]
  by_day: ByDay[]
  by_actuator: ByActuator[]
  by_device_name: ByDeviceName[]
  by_device_name_and_action: ByDeviceNameAndAction[]
  value_changes_by_device_type: ByDeviceName[]
  count_on_off_by_date: CountOnOffByDate[]
  count_on_off_by_actuator: CountOnOffByActuator[]
  average_dht_by_device: AverageDhtByDevice[]
  average_dht_by_day: AverageDhtByDay[]
}

export interface ByActionType {
  action_type: string
  total: number
}

export interface ByActuator {
  actuator: number
  total: number
}

export interface ByDay {
  date: Date
  total: number
}

export interface ByDeviceName {
  device_name: string
  total: number
}

export interface ByDeviceNameAndAction {
  device_name: string
  action_type: string
  total: number
}

export interface ByDeviceType {
  device_type: string
  total: number
}

export interface CountOnOffByActuator {
  actuator: number
  true: number
  false: number
}

export interface CountOnOffByDate {
  date: Date
  true: number
  false: number
}

export interface AverageDhtByDay {
  date: Date
  avg_temperature: number
  avg_humidity: number
}

export interface AverageDhtByDevice {
  device_name: string
  avg_temperature: number
  avg_humidity: number
}

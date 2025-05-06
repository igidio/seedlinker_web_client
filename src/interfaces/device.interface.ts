export interface DeviceInterface {
  _id: ID
  uuid: string
  user_uuid: string
  name: string
  type: string
  pins: Pins[]
  status: boolean
  conditions: Conditions
}

export interface Pins {
  _id?: ID
  pin: number
  type: 'input' | 'output'
  gpio: string
  name: string
  value?: number
  status: boolean
}

export interface ID {
  $oid: string
}

export interface Conditions {
  by_time: any[]
  by_event: any[]
}

export interface IoInputModesInterface {
  type: string
  value: number
}

export interface IoValuesInterface {
  value: number
  type: 'input' | 'output'
  label: string
  mode?: IoInputModesInterface[]
}

export interface PinValuesInterface {
  value: number
  label: string
}

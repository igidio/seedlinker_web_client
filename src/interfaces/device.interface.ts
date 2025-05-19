export interface DeviceInterface {
  _id: ID
  uuid: string
  user_uuid: string
  name: string
  type: string
  pins: Pins[]
  status: boolean
  conditions: ConditionsInterface
  mode: 'auto' | 'manual'
}

export interface Pins {
  id?: string
  pin: number
  type: 'input' | 'output'
  gpio: string
  name: string
  value: number
  status: boolean
}

export interface ID {
  $oid: string
}

export interface SensorConditionInterface {
  id: string
  input_pin: number
  value: number
  input_mode: number
  output_pin: number
  min_value: number
  max_value: number
}

export interface TimeConditionInterface {
  id: string
  output_pin: number
  start_hour: number
  start_minute: number
  end_hour: number
  end_minute: number
}

export interface ConditionsInterface {
  by_sensor: SensorConditionInterface[]
  by_time: TimeConditionInterface[]
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

export interface ConditionDtoInterface {
  type: 'sensor' | 'time'
  data: Partial<SensorConditionInterface | TimeConditionInterface>
}

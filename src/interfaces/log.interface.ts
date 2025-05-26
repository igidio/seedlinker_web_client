export interface LogInterface {
  id: number
  device_id: string
  type: "dht" | "water" | "manual" | "time"
  device_name: string
  user_id: string
  actuator: number
  value: boolean
  device_type: "ESP32" | "ESP8266"
  created_at: string
  water?: WaterInterface[]
  dht?: DhtInterface[]
}

export interface DhtInterface {
    humidity:    number;
    temperature: number;
    id:          number;
    log_id:      number;
    created_at:  Date;
}


export interface WaterInterface {
    log_id:     number;
    id:         number;
    value:      number;
    created_at: Date;
    mode:       "analog" | "digital";
}

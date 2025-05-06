import type { IoValuesInterface, PinValuesInterface } from '@/interfaces'

export const pin_values: Record<'ESP8266' | 'ESP32', PinValuesInterface[]> = {
  ESP32: [
    { value: 4, label: 'D4 - GPIO4' },
    { value: 5, label: 'D5 - GPIO5' },
    { value: 12, label: 'D12 - GPIO12' },
    { value: 13, label: 'D13 - GPIO13' },
    { value: 14, label: 'D14 - GPIO14' },
    { value: 15, label: 'D15 - GPIO15' },
    { value: 16, label: 'D16 - GPIO16' },
    { value: 17, label: 'D17 - GPIO17' },
    { value: 18, label: 'D18 - GPIO18' },
    { value: 19, label: 'D19 - GPIO19' },
    { value: 21, label: 'D21 - GPIO21' },
    { value: 22, label: 'D23 - GPIO22' },
    { value: 23, label: 'D24 - GPIO23' },
    { value: 25, label: 'D25 - GPIO25' },
    { value: 26, label: 'D26 - GPIO26' },
    { value: 27, label: 'D27 - GPIO27' },
    { value: 32, label: 'D32 - GPIO32' },
    { value: 32, label: 'D33 - GPIO33' },
  ],
  ESP8266: [
    { value: 16, label: 'DO - GPIO16' },
    { value: 5, label: 'D1 - GPIO5' },
    { value: 4, label: 'D2 - GPIO4' },
    { value: 14, label: 'D5 - GPIO14' },
    { value: 12, label: 'D6 - GPIO12' },
    { value: 13, label: 'D7 - GPIO13' },
  ],
}

export const io_values: IoValuesInterface[] = [
  {
    label: 'device.io.values.temperature_and_humidity_sensor',
    type: 'input',
    value: 1,
    mode: [
      {
        type: 'humidity',
        value: 0,
      },
      {
        type: 'temperature_celsius',
        value: 1,
      },
      {
        type: 'temperature_fahrenheit',
        value: 2,
      },
    ]
  },
  {
    label: 'device.io.values.water_sensor',
    type: 'input',
    value: 2,
    mode: [
      {
        type: 'digital',
        value: 0,
      },
      {
        type: 'analog',
        value: 1,
      },
    ],
  },
  { label: 'device.io.values.heater', type: 'output', value: 3 },
  { label: 'device.io.values.air_conditioner', type: 'output', value: 4 },
  { label: 'device.io.values.water_punp', type: 'output', value: 5 },
]

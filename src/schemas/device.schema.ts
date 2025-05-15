import { z } from 'zod'

export const condition_sensor_schema = z
  .object({
    selected_input: z
      .object(
        {
          value: z.number(),
        },
        { message: 'device.conditions.error.input_device_required' },
      )
      .refine((val) => val !== null, { message: 'device.conditions.error.input_device_required' }),
    selected_output: z
      .number({ message: 'device.conditions.error.output_device_required' })
      .nullable()
      .refine((val) => val !== null, { message: 'device.conditions.error.output_device_required' }),
    min_value: z.number().nullable(),
    max_value: z.number().nullable(),
  })
  .refine((data) => data.min_value !== null || data.max_value !== null, {
    message: 'device.conditions.error.at_least_one_value_required',
    path: ['min_value', 'max_value'],
  })
  .refine(
    (data) => {
      if (data.min_value !== data.max_value) {
        if (data.min_value !== null && data.max_value !== null) {
          return data.min_value <= data.max_value
        } else if (data.min_value === null || data.max_value === null) {
          return true
        }
        return true
      }
    },
    {
      message: 'device.conditions.error.number_comparison',
      path: ['min_value', 'max_value'],
    },
  )
  .refine(
    (data) => {
      if (data.min_value !== null && data.min_value < 0) return false
      if (data.max_value !== null && data.max_value < 0) return false
      return true
    },
    {
      message: 'device.conditions.error.negative_numbers_not_allowed',
      path: ['min_value', 'max_value'],
    },
  )

export const condition_time_schema = z
  .object({
    selected_output: z
      .number({ message: 'device.conditions.error.output_device_required' })
      .nullable()
      .refine((val) => val !== null, { message: 'device.conditions.error.output_device_required' }),
    start_hour: z
      .number({ message: 'device.conditions.error.start_hour_required' })
      .nullable()
      .refine((val) => val !== null, { message: 'device.conditions.error.start_hour_required' }),
    start_minute: z
      .number({ message: 'device.conditions.error.start_minute_required' })
      .nullable()
      .refine((val) => val !== null, { message: 'device.conditions.error.start_minute_required' }),
    end_hour: z
      .number({ message: 'device.conditions.error.end_hour_required' })
      .nullable()
      .refine((val) => val !== null, { message: 'device.conditions.error.end_hour_required' }),
    end_minute: z
      .number({ message: 'device.conditions.error.end_minute_required' })
      .nullable()
      .refine((val) => val !== null, { message: 'device.conditions.error.end_minute_required' }),
  })
  .refine((data) => data.start_hour !== null && data.start_hour >= 0 && data.start_hour <= 23, {
    message: 'device.conditions.error.start_hour_invalid',
    path: ['start_hour'],
  })
  .refine((data) => data.end_hour !== null && data.end_hour >= 0 && data.end_hour <= 23, {
    message: 'device.conditions.error.end_hour_invalid',
    path: ['end_hour'],
  })
  .refine(
    (data) => data.start_minute !== null && data.start_minute >= 0 && data.start_minute <= 59,
    {
      message: 'device.conditions.error.start_minute_invalid',
      path: ['start_minute'],
    },
  )
  .refine((data) => data.end_minute !== null && data.end_minute >= 0 && data.end_minute <= 59, {
    message: 'device.conditions.error.end_minute_invalid',
    path: ['end_minute'],
  })

export const io_form_schema = z.object({
  pin_selected: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, { message: 'Pin is required' }),
  io_selected: z
    .object({
      value: z.number(),
      type: z.enum(['input', 'output']),
    })
    .nullable()
    .refine((val) => val !== null, { message: 'IO type is required' }),
})

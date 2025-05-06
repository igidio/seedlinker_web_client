import { z } from 'zod'

export const condition_sensor_schema = z
  .object({
    selected_input: z
      .object({
        value: z.number(),
      })
      .refine((val) => val !== null, { message: 'device.conditions.error.input_device_required' }),
    selected_output: z
      .number()
      .nullable()
      .refine((val) => val !== null, { message: 'device.conditions.error.output_device_required' }),
    min_value: z.number().nullable(),
    max_value: z.number().nullable(),
  })
  .refine(
    (data) => data.min_value !== null || data.max_value !== null,
    {
      message: 'device.conditions.error.at_least_one_value_required',
      path: ['min_value', 'max_value'],
    },
  )
  .refine(
    (data) => {
      if (data.min_value !== null && data.max_value !== null) {
        return data.min_value <= data.max_value
      } else if (data.min_value === null || data.max_value === null) {
        return true
      }
      return true
    },
    {
      message: 'device.conditions.error.number_comparison',
      path: ['min_value', 'max_value'],
    },
  )

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

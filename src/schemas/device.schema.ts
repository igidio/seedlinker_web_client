import { z } from 'zod'

export const io_form_schema = z.object({
  pin_selected: z.object({
    value: z.number(),
    label: z.string(),
  }).nullable().refine((val) => val !== null, { message: 'Pin is required' }),
  io_selected: z.object({
    value: z.string(),
    type: z.enum(['input', 'output']),
  }).nullable().refine((val) => val !== null, { message: 'IO type is required' }),
});

export const condition_sensor_schema = z.object({
  selected_input: z.number().nullable().refine((val) => val !== null, { message: 'Input device is required' }),
  selected_output: z.number().nullable().refine((val) => val !== null, { message: 'Output device is required' }),
  min_value: z.number().nullable(),
  max_value: z.number().nullable(),
});

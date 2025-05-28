export interface ChartInterface {
  elements: {
    label: string
    value: number
  }[]
}

export interface BarChartInterface {
  elements: {
    type: string[]
    label: string[]
    value: number[][]
  }
}

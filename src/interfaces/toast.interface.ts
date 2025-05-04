export interface ToastInterface {
  id?: string
  message: string
  type: 'success' | 'warning' | 'error' | 'info'
  duration?: number
  icon?: string
  soft?: boolean
  outline?: boolean
  dash?: boolean
}

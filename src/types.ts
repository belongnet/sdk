import { type CheckoutParams, type Mode } from './schemas.js'

export interface Options {
  mode: Mode
  el?: HTMLElement
  params: CheckoutParams
  onSuccess?: (data: any) => void
  onError?: (error: any) => void
}

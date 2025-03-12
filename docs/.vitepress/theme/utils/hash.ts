import { stringToBase64, base64ToString } from 'uint8array-extras'

export function toHash(obj: Record<any, any>): string {
  return stringToBase64(JSON.stringify(obj), {
    urlSafe: true,
  })
}

export function fromHash<T = any>(hash: string): T {
  return JSON.parse(base64ToString(hash))
}

import { expect, test } from 'vitest'

import * as exports from './index.js'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
[
  "createPaymentFrame",
  "PaymentTarget",
  "PaymentEvent",
  "isPaymentEvent",
  "validateEvent",
  "validateParams",
]`)
})

import { describe, expect, it } from 'vitest'
import { generatePaymentUrl } from './utils.js'
import { faker } from '@faker-js/faker'
import { PaymentTarget } from './enums.js'

faker.seed(1)

describe('generatePaymentUrl', () => {
  it('should generate a payment URL for the production environment', () => {
    const params = {
      target: PaymentTarget.HubMinting,
      key: faker.string.uuid(),
      hubId: faker.database.mongodbObjectId(),
    } as const

    const paymentUrl = generatePaymentUrl(params)

    expect(paymentUrl).toBe(
      `https://app.belong.net/payments?target=hub-minting&key=${params.key}&hubId=${params.hubId}`
    )
  })
})

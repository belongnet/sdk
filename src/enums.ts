export enum PaymentTarget {
  EventTicket = 'event-ticket',
  HubMinting = 'hub-minting',
  Checkout = 'checkout',
}

export enum PaymentEvent {
  Loaded = 'loaded',
  PaymentSuccess = 'payment-success',
  PaymentError = 'payment-error',
  PaymentCanceled = 'payment-canceled',
}

export const CheckoutInfo = {
    valid: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    },
  } as const;

  export const SortOption = {
    NAME_ASC: 'az',
    NAME_DESC: 'za',
    PRICE_LOW_HIGH: 'lohi',
    PRICE_HIGH_LOW: 'hilo',
  } as const;
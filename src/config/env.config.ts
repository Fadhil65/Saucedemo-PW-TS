import dotenv from 'dotenv';

  dotenv.config();

  export const ENV = {
    BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
    API_BASE_URL: process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  } as const;

  export const CREDENTIALS = {
    standard: {
      username: process.env.STANDARD_USER || 'standard_user',
      password: process.env.PASSWORD || 'secret_sauce',
    },
    locked: {
      username: process.env.LOCKED_USER || 'locked_out_user',
      password: process.env.PASSWORD || 'secret_sauce',
    },
    invalid: {
      username: 'invalid_user',
      password: 'wrong_password',
    },
  } as const;
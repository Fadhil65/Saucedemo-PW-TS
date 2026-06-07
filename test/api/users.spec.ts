import { test, expect } from '@playwright/test';
import { ENV } from '../../src/config/env.config';
import { expectValidUserObject } from '../../src/utils/schema';
import { expectValidUserArray } from '../../src/utils/schema';

test.describe('API - Users',  () => {
    
    test('TC-024: Get user/1 return 200 and id 1',{ tag: ['@api', '@regression','@positive'] }, 
        async({ request })=>{
     const response = await request.get(`${ENV.API_BASE_URL}/users/1`);
     const body = await response.json();
     const headers = response.headers();

     expect(response.status()).toBe(200); 
     expect(headers['content-type']).toContain('application/json');  
     expectValidUserObject(body);
    //  expect(body).toMatchObject({
    //     id: 1,
    //     name: 'Leanne Graham'
    //     })
    
        //console.log(response.headers());
        //console.log(body);
});
    test('TC-025: GET /users returns list of 10 users', { tag: ['@api', '@regression','@positive'] },
        async ({ request }) => {
     const response = await request.get(`${ENV.API_BASE_URL}/users`);
     const body = await response.json();
     const headers = response.headers();

     expect(response.status()).toBe(200);
     expect(headers['content-type']).toContain('application/json');
     expectValidUserArray(body);
     expect(body).toHaveLength(10);
    // console.log(response.headers());
  });

  test('TC-026: GET /users/999 returns 404', { tag: ['@api', '@regression','@negative'] }, async ({ request }) => {
    const response = await request.get(`${ENV.API_BASE_URL}/users/999`);

    expect(response.status()).toBe(404);
  });
});
  



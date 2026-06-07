import { z } from 'zod';

const UserSchemaObject = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email()
});
const UserSchemaArray = z.array(UserSchemaObject);

export function expectValidUserObject(user: any) {
    UserSchemaObject.parse(user);
  }
export function expectValidUserArray(users: any) {
    UserSchemaArray.parse(users);
  }
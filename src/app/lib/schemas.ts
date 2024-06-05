import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  email: z.string().email(),
  password: z.string().min(8).max(100),
});
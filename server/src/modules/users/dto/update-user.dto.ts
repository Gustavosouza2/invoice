import { createZodDto } from '@anatine/zod-nestjs';
import z from 'zod';

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
});

export class UpdateUserDto extends createZodDto(updateUserSchema) {}

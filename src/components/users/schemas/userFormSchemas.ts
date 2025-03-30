
import { z } from 'zod';

export const pendingUserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.enum(['Admin', 'Developer'], {
    required_error: "Please select a role.",
  }),
  status: z.literal('pending').default('pending'),
});

export const activeUserSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.enum(['Admin', 'Developer'], {
    required_error: "Please select a role.",
  }),
  lastLoginDate: z.string().optional(),
  developerApp: z.boolean().default(false),
  status: z.literal('active').default('active'),
});

export type PendingUserFormValues = z.infer<typeof pendingUserSchema>;
export type ActiveUserFormValues = z.infer<typeof activeUserSchema>;

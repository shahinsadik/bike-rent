import { z } from 'zod';

const rentalValidationSchema = z.object({
  userId: z.string().optional(),
  bikeId: z.string().min(1, { message: 'Bike Id is required' }),
  // startTime: z.string().transform((str) => new Date(str)),
  startTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date string',
    })
    .transform((val) => new Date(val)),
  returnTime: z
    .date()
    .optional()
    .transform((str) => (str ? new Date(str) : null)),
  totalCost: z.number().optional().default(0),
  isReturned: z.boolean().optional().default(false),
});

export const RentalValidations = {
  rentalValidationSchema,
};

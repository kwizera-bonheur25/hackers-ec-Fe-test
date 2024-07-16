import { z } from 'zod';

export const reviewFormSchema = z.object({
	ratings: z.number({ message: 'Please rate this product' }),
	feedBack: z.string().min(1, "feedBack field can't be empty!"),
});

export type reviewFormSchemaType = z.infer<typeof reviewFormSchema>;

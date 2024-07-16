import { z } from 'zod';

export const chatInputValidations = z.object({
	message: z.string().min(1).max(255),
});

export type chatInputType = z.infer<typeof chatInputValidations>;

import { z } from 'zod';

export const productValidation = z.object({
	id: z.string().optional(),
	name: z.string().min(1, "Name field can't be empty!"),
	images: z.array(z.any(), {
		required_error: 'Product images required!',
	}),
	price: z.string().min(1, "Price field can't be empty!"),
	discount: z.string().min(1, "Discount field can't be empty!"),
	quantity: z
		.string({
			required_error: 'Quantity is required!',
		})
		.min(1, "Quantity field can't be empty!"),
	categoryId: z.string().min(1, "CategoryId field can't be empty!"),
	expiryDate: z.string().min(1, "Expiry date field can't be empty!"),
});

export type productTypes = z.infer<typeof productValidation>;

import { z } from 'zod';

export const OTPSchema = z.object({
	otp: z.string().refine((value) => /^\d{6}$/.test(value), {
		message: 'OTP must be a 6-digit number',
	}),
});

export type OTPSchemaType = z.infer<typeof OTPSchema>;

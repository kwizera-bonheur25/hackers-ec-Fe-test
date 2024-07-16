import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	children: ReactNode;
}

export const ButtonIcon = ({
	children,
	className,
	variant,
	size,
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{children}
		</button>
	);
};

const buttonVariants = cva('rounded-3xl', {
	variants: {
		variant: {
			primary:
				'p-2 bg-blue-500 text-neutral-white bg-custom-gradient flex items-center gap-4 font-poppins',
			secondary: 'p-2 bg-action-warning border-neutral-darkRed',
			danger: 'border-none bg-action-error p-2',
		},
		size: {
			sm: 'text-sm px-7 py-2',
			md: 'text-xl px-10 py-3',
			lg: 'text-xl px-10 py-3',
		},
		types: {
			submit: 'submit',
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'sm',
	},
});

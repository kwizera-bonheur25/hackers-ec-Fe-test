import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { forgotPassword } from '../../redux/features/forgottonSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
	ForgotPasswordSchema,
	ForgotPasswordType,
} from '../../validations/forgottenPassword/forgotten.password.validation';
import FormInput from '../Forms/InputText';
import IconLoader from '../Loaders/IconLoader';
import BackButton from '../buttons/BackButton';
import Button from '../buttons/Button';

const ForgotPasswordForm = () => {
	const { isLoading } = useAppSelector((state) => state.forgotPassword);
	const dispatch = useAppDispatch();
	const { showSuccessMessage, showErrorMessage } = useToast();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordType>({
		resolver: zodResolver(ForgotPasswordSchema),
	});

	const onSubmit: SubmitHandler<ForgotPasswordType> = async (
		data: ForgotPasswordType,
	) => {
		try {
			const res = await dispatch(forgotPassword(data)).unwrap();
			showSuccessMessage(res.message);
			navigate('/forgot-password-success');
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occured! Please try again!',
			);
		}
	};

	return (
		<>
			<form className="flex flex-col gap-9" onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					type="email"
					placeholder="Enter your email here"
					otherStyles="text-center bg-neutral-white border border-overlay w-full rounded-sm py-1 mobile:py-2 mb-2"
					{...register('email')}
					error={errors.email}
				/>

				<Button
					url={null}
					buttonType="submit"
					color="bg-action-success"
					otherStyles="w-full h-10 text-base rounded-3xl hover:bg-action-success/95"
					title={
						isLoading ? (
							<>
								<IconLoader className="animate-spin mr-1" /> {'Loading....'}
							</>
						) : (
							'Continue'
						)
					}
				/>
			</form>

			<BackButton
				otherStyles="
			py-2 hover:bg-neutral-grey/20 rounded-3xl  gap-4 mobile:text-sm
			"
				title="Return to site"
			/>
		</>
	);
};

export default ForgotPasswordForm;

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { resetPassword } from '../../redux/features/resetSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
	ResetPasswordPayload,
	ResetPasswordSchema,
	ResetPasswordSchemaType,
} from '../../validations/resetPassword/reset.password.validation';
import FormInput from '../Forms/InputText';
import IconLoader from '../Loaders/IconLoader';
import BackButton from '../buttons/BackButton';
import Button from '../buttons/Button';

const ResetPasswordForm = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	const { isLoading } = useAppSelector((state) => state.resetPassword);
	const dispatch = useAppDispatch();
	const { showSuccessMessage, showErrorMessage } = useToast();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordSchemaType>({
		resolver: zodResolver(ResetPasswordSchema),
	});

	const onSubmit: SubmitHandler<ResetPasswordPayload> = async (data) => {
		if (!token) {
			showErrorMessage('Invalid token. please try again');
			return navigate('/login');
		}
		try {
			const { password } = data;
			const res = await dispatch(resetPassword({ password, token })).unwrap();
			showSuccessMessage(res.message);

			navigate('/login');
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
			<form className=" flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
				<FormInput
					type="password"
					placeholder="Password"
					otherStyles="text-center bg-neutral-white border border-overlay w-full rounded-sm py-1 mobile:py-2 mb-2"
					{...register('password')}
					error={errors.password}
				/>
				<FormInput
					type="password"
					placeholder="Confirm Password"
					otherStyles="text-center bg-neutral-white border border-overlay w-full rounded-sm py-1 mobile:py-2 mb-2"
					{...register('confirmPassword')}
					error={errors.confirmPassword}
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
							'Confirm'
						)
					}
				/>
			</form>
			<BackButton
				url="/"
				otherStyles="
			py-2 hover:bg-neutral-grey/20 rounded-3xl  gap-4 mobile:text-sm
			"
				title="Return to site"
			/>
		</>
	);
};

export default ResetPasswordForm;

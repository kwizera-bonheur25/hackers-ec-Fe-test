import { SubmitHandler, useForm } from 'react-hook-form';
import { roundedLogo } from '../../utils/images';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import {
	RegisterSchema,
	RegisterSchemaType,
} from '../../validations/auth/Register.validation';
import { DynamicData } from '../../@types/DynamicData';
import { registera } from '../../redux/features/RegisterSlice';
import IconLoader from '../Loaders/IconLoader';
import GoogleButton from '../buttons/GoogleButton';
import useHandleResize from '../../hooks/useHandleResize';
import useToast from '../../hooks/useToast';
import FormInput from '../Forms/InputText';
import Button from '../buttons/Button';
import BackButton from '../buttons/BackButton';

const RegisterForm = () => {
	const { showErrorMessage, showSuccessMessage } = useToast();
	const { show } = useHandleResize();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { isLoading } = useAppSelector((state) => state.register);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

	const onSubmit: SubmitHandler<RegisterSchemaType> = async (
		data: RegisterSchemaType,
	) => {
		try {
			const res = await dispatch(registera(data)).unwrap();
			showSuccessMessage(res.message);
			navigate('/login');
		} catch (error) {
			const err = error as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occured! Please try again!',
			);
		}
	};
	const hasErrors = Object.keys(errors).length > 0;
	return (
		<div className="relative ipad:px-4 w-full ipad:w-[55%] ipad:h-full flex-center  flex-col ipad:gap-2 gap-5 tablet:gap-10 laptop:gap-7 overflow-auto">
			<div className="absolute top-1 tablet:top-2 laptop:top-0.5 right-1">
				<BackButton isBordered title="Back" />
			</div>
			{!hasErrors && (
				<div className="w-max h-max">
					<img src={roundedLogo} alt="ShopTrove logo" width={70} />
				</div>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mobile:w-full mobile:gap-4 ipad:gap-2 tablet:w-full ipad:w-full w-full flex flex-col gap-3  tablet:gap-3 laptop:gap-4"
			>
				<FormInput
					type="text"
					placeholder="User name"
					otherStyles="px-3  mobile:py-3 py-2 tablet:py-4 laptop:py-2.5 ipad:py-2 text-xs rounded-lg"
					{...register('userName')}
					error={errors.userName}
				/>
				<FormInput
					type="text"
					placeholder="First name"
					otherStyles="px-3  mobile:py-3 py-2 tablet:py-4 laptop:py-2.5 ipad:py-2 text-xs rounded-lg"
					{...register('firstName')}
					error={errors.firstName}
				/>
				<FormInput
					type="text"
					placeholder="Last name"
					otherStyles="px-3  mobile:py-3 py-2 tablet:py-4 laptop:py-2.5 ipad:py-2 text-xs rounded-lg"
					{...register('lastName')}
					error={errors.lastName}
				/>
				<FormInput
					type="text"
					placeholder="Email"
					otherStyles="px-3  mobile:py-3 py-2 tablet:py-4 laptop:py-2.5 ipad:py-2 text-xs rounded-lg"
					{...register('email')}
					error={errors.email}
				/>
				<FormInput
					type="password"
					placeholder="Password"
					otherStyles="px-3  mobile:py-3 py-2 tablet:py-4 laptop:py-2.5 ipad:py-2 text-xs rounded-lg"
					{...register('password')}
					error={errors.password}
				/>
				<FormInput
					type="password"
					placeholder="Confirm password"
					otherStyles="px-3  mobile:py-3 py-2 tablet:py-4 laptop:py-2.5 ipad:py-2 text-xs rounded-lg"
					{...register('confirmPassword')}
					error={errors.confirmPassword}
				/>

				<Button
					url={null}
					buttonType="submit"
					title={
						isLoading ? (
							<>
								<IconLoader className="animate-spin mr-1" />{' '}
								{'Authenticating....'}
							</>
						) : (
							'Register'
						)
					}
					otherStyles=" ipad:h-10 tablet:h-12 rounded-xl"
				/>
			</form>
			<GoogleButton />
			{!show && (
				<div className="w-full flex items-center bg-neutral-grey/40 py-1 tablet:py-2 px-4 rounded-xl">
					<div className="flex-1 text-xs ipad:text-xs text-center">
						Already have an account
					</div>
					<Button
						buttonType="button"
						title="LOGIN"
						url="/login"
						otherStyles="bg-black/30 py-0 tablet:py-2 rounded-lg"
					/>
				</div>
			)}
		</div>
	);
};

export default RegisterForm;

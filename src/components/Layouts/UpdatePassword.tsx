import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { updateUserPassword } from '../../redux/features/passwordUpdateSlice';
import FormInput from '../Forms/InputText';
import Button from '../buttons/Button';
import IconLoader from '../Loaders/IconLoader';
import useToast from '../../hooks/useToast';
import BackButton from '../buttons/BackButton';
import UserrProfileHeader from '../UserrProfileHeader';
import UserProfileSideBox from '../UserProfileSideBox';
import {
	PasswordUpdateSchema,
	PasswordUpdateSchemaType,
} from '../../validations/auth/password.validation';
import { UserPassword } from '../../@types/auth/passwordTypes';
import { DynamicData } from '../../@types/DynamicData';

const UpdatePassword = () => {
	const dispatch = useAppDispatch();
	const { showErrorMessage, showSuccessMessage } = useToast();
	const { isLoading, error } = useAppSelector((state) => state.updatePassword);
	const { data } = useAppSelector((state) => state.profile);

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<PasswordUpdateSchemaType>({
		resolver: zodResolver(PasswordUpdateSchema),
	});

	useEffect(() => {
		if (error) {
			showErrorMessage(error);
		}
	}, [error, showErrorMessage]);

	const onSubmit: SubmitHandler<PasswordUpdateSchemaType> = (data) => {
		const passData: UserPassword = {
			oldPassword: data.oldPassword,
			newPassword: data.newPassword,
			confirmPassword: data.confirmPassword,
		};
		dispatch(updateUserPassword(passData))
			.then((resultAction: DynamicData) => {
				if (resultAction.payload.status === 'SUCCESS') {
					showSuccessMessage(resultAction.payload.message);
					reset();
				} else {
					showErrorMessage(resultAction.payload.message);
				}
			})
			.catch((error: DynamicData) => {
				showErrorMessage(error.message);
			});
	};

	return (
		<div className="flex flex-col gap-10 bg-overlay z-[-1] h-screen">
			<div className="absolute top-52 right-5 z-[2] mobile:top-10">
				<BackButton
					url="/"
					title="Back"
					otherStyles="px-4 py-2 bg-neutral-white text-lg rounded-sm font-bold"
				/>
			</div>
			<UserrProfileHeader
				image={data?.profileImage}
				firstName={data?.firstName}
			/>
			<div className="flex flex-col py-10 px-6 tablet:flex-row my-14 bg-overlay">
				<div className="flex justify-center items-center w-[100%] font-poppins tablet:w-[10rem]">
					<UserProfileSideBox />
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="py-4 flex flex-col tablet:flex-row justify-around tablet:px-2 target:w-[80%] w-[100%]"
				>
					<div className="flex flex-col">
						<label className="flex flex-col font-semibold gap-3">
							Old Password:
							<FormInput
								type="password"
								placeholder="***********"
								otherStyles="form-input"
								{...register('oldPassword')}
								error={errors.oldPassword}
							/>
						</label>
						<label className="flex flex-col font-semibold mt-2 gap-3">
							New Password:
							<FormInput
								type="password"
								placeholder="***********."
								otherStyles="form-input"
								{...register('newPassword')}
								error={errors.newPassword}
							/>
						</label>
						<label className="flex flex-col font-semibold mt-2 gap-3">
							Confirm Password:
							<FormInput
								type="password"
								placeholder="***********."
								otherStyles="form-input"
								{...register('confirmPassword')}
								error={errors.confirmPassword}
							/>
						</label>
					</div>
					<div className="flex flex-col mt-3">
						<Button
							url={null}
							buttonType="submit"
							title={
								isLoading ? (
									<>
										<IconLoader className="animate-spin mr-1" />
										{'Please wait....'}
									</>
								) : (
									'Submit'
								)
							}
							otherStyles="rounded-xl"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdatePassword;

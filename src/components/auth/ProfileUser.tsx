import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import Upload from '../../assets/upload.svg';
import FormInput from '../Forms/InputText';
import useToast from '../../hooks/useToast';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
	fetchUserProfile,
	updateUserProfile,
	updateUserProfileImage,
} from '../../redux/features/userUpdateSlice';
import {
	UserUpdateSchema,
	UserUpdateSchemaType,
} from '../../validations/auth/profile.validation';
import { UserProfile } from '../../@types/auth/profileTypes';
import Button from '../buttons/Button';
import IconLoader from '../Loaders/IconLoader';
import { DynamicData } from '../../@types/DynamicData';
import UserProfileHeader from '../UserProfileHeader';
import UserProfileSideBox from '../UserProfileSideBox';
import BackButton from '../buttons/BackButton';
import filterEmptyStrings from '../../utils/RemoveEmptyString';

const ProfileUser = () => {
	const dispatch = useAppDispatch();
	const { data, isLoading, error } = useAppSelector((state) => state.profile);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const { showErrorMessage, showSuccessMessage } = useToast();

	const [initialData, setInitialData] = useState<UserUpdateSchemaType>({
		...data,
	});
	const [formData, setFormData] = useState<UserUpdateSchemaType>({ ...data });

	useEffect(() => {
		dispatch(fetchUserProfile());
	}, [dispatch]);

	useEffect(() => {
		if (data) {
			const birthDate = data?.birthDate ? new Date(data.birthDate) : undefined;
			const zipCode = data.zipCode ? String(data.zipCode) : undefined;
			const formattedDate = birthDate?.toISOString().split('T')[0];
			setInitialData({ ...data, birthDate: formattedDate, zipCode });
			setFormData({ ...data, birthDate: formattedDate, zipCode });
		}
	}, [data]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<UserUpdateSchemaType>({
		resolver: zodResolver(UserUpdateSchema),
		defaultValues: formData,
	});

	useEffect(() => {
		reset(formData);
	}, [formData, reset]);

	const watchedFormData = useWatch({ control });

	const isFormDirty =
		JSON.stringify(initialData) !== JSON.stringify(watchedFormData) ||
		selectedImage !== null;

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedImage(e.target.files[0]);
		}
	};

	// handle submit a form
	const onSubmit: SubmitHandler<UserUpdateSchemaType> = async (updatedData) => {
		try {
			if (error) return showErrorMessage(error);
			delete updatedData.email;
			const res = await dispatch(
				updateUserProfile(filterEmptyStrings(updatedData) as UserProfile),
			).unwrap();

			res.status === 'SUCCESS'
				? showSuccessMessage(res.message)
				: showErrorMessage(res.message);
			if (selectedImage) {
				await dispatch(updateUserProfileImage(selectedImage));
			}
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data || err?.message || 'Something went wrong! Please try again!',
			);
		}
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
			<UserProfileHeader
				image={data?.profileImage}
				handleImageChange={handleImageChange}
				firstName={data?.firstName}
				upload={Upload}
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
							First Name:
							<FormInput
								type="text"
								placeholder="Ivy"
								otherStyles="form-input"
								{...register('firstName', {
									required: 'First name is required',
								})}
								error={errors.firstName}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Last Name:
							<FormInput
								type="text"
								placeholder="Jacky"
								otherStyles="form-input"
								{...register('lastName', {
									required: 'Last name is required',
								})}
								error={errors.lastName}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Email:
							<FormInput
								type="text"
								disabled
								placeholder="email@example.com"
								otherStyles="form-input"
								{...register('email', {
									required: 'Email is required',
								})}
								error={errors.email}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Gender:
							<div className="w-full bg-[#D9D9D9] text-black/75 px-2 rounded-md mt-2">
								<select
									{...register('gender')}
									className="w-full outline-none bg-[#D9D9D9]"
								>
									<option value="Female">Female</option>
									<option value="Male">Male</option>
								</select>
							</div>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Phone Number:
							<FormInput
								type="text"
								placeholder="0780000000"
								otherStyles="form-input"
								{...register('phoneNumber')}
								error={errors.phoneNumber}
							/>
						</label>
					</div>

					<div className="flex flex-col">
						<label className="flex flex-col font-semibold gap-3">
							Birth Date:
							<FormInput
								type="date"
								placeholder="10/10/23"
								otherStyles="form-input"
								{...register('birthDate')}
								error={errors.birthDate}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Language:
							<FormInput
								type="text"
								placeholder="Swahili"
								otherStyles="form-input"
								{...register('preferredLanguage')}
								error={errors.preferredLanguage}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Currency:
							<div className="w-full bg-[#D9D9D9] text-black/75 px-2 rounded-md mt-2">
								<select
									{...register('preferredCurrency')}
									className="w-full outline-none bg-[#D9D9D9]"
								>
									<option value="Euro">Euro</option>
									<option value="Rwf">Rwf</option>
									<option value="Dollar">Dollar</option>
									<option value="Pound">Pound</option>
								</select>
							</div>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Country:
							<FormInput
								type="text"
								placeholder="Rwanda"
								otherStyles="form-input"
								{...register('country')}
								error={errors.country}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							City:
							<FormInput
								type="text"
								placeholder="Kigali"
								otherStyles="form-input"
								{...register('city')}
								error={errors.city}
							/>
						</label>
					</div>
					<div className="flex flex-col">
						<label className="flex flex-col font-semibold gap-3">
							Primary Address:
							<FormInput
								type="text"
								placeholder="Nyarugenge"
								otherStyles="form-input"
								{...register('addressLine1')}
								error={errors.addressLine1}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3">
							Secondary Address:
							<FormInput
								type="text"
								placeholder="Muhanga"
								otherStyles="form-input"
								{...register('addressLine2')}
								error={errors.addressLine2}
							/>
						</label>
						<label className="flex flex-col font-semibold gap-3 mb-10">
							Zip Code:
							<FormInput
								type="text"
								placeholder="0000"
								otherStyles="form-input"
								{...register('zipCode')}
								error={errors.zipCode}
							/>
						</label>
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
									'Save profile'
								)
							}
							otherStyles="rounded-xl"
							disabled={!isFormDirty}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileUser;

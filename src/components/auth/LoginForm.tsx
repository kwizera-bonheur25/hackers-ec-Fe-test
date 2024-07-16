import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { DynamicData } from '../../@types/DynamicData';
import { roundedLogo } from '../../utils/images';
import BackButton from '../../components/buttons/BackButton';
import Button from '../../components/buttons/Button';
import GoogleButton from '../../components/buttons/GoogleButton';
import IconLoader from '../../components/Loaders/IconLoader';
import useHandleResize from '../../hooks/useHandleResize';
import useToast from '../../hooks/useToast';
import useToken from '../../hooks/useToken';
import { login } from '../../redux/features/loginSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
	LoginSchema,
	LoginSchemaType,
} from '../../validations/auth/login.validation';
import FormInput from '../Forms/InputText';
import fetchInfo from '../../utils/userDetails';

const LoginForm = () => {
	const { isLoading } = useAppSelector((state) => state.login);
	const { showErrorMessage, showSuccessMessage } = useToast();
	const { saveAccessToken } = useToken();
	const { show } = useHandleResize();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

	const onSubmit: SubmitHandler<LoginSchemaType> = async (
		data: LoginSchemaType,
	) => {
		try {
			const res = await dispatch(login(data)).unwrap();
			saveAccessToken(res.data);
			if (!res.data) {
				navigate('/success');
			} else {
				const userRole: DynamicData = new Array(fetchInfo());
				showSuccessMessage(res.message);
				if (userRole[0].role === 'ADMIN') {
					navigate('/dashboard');
				} else {
					navigate('/');
				}
			}
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err?.data?.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};

	return (
		<div className="relative w-full ipad:w-[55%] h-3/5 ipad:h-full py-5 flex-center flex-col gap-10">
			<div className="absolute top-5 right-5">
				<BackButton isBordered title="Back" />
			</div>
			{show && (
				<div className="w-max h-max">
					<img src={roundedLogo} alt="ShopTrove logo" width={80} />
				</div>
			)}
			<form
				className="w-[90%] ipad:w-[70%] flex flex-col gap-5"
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormInput
					type="text"
					placeholder="Email"
					otherStyles="form-input"
					{...register('email')}
					error={errors.email}
				/>
				<FormInput
					type="password"
					placeholder="Password"
					otherStyles="form-input"
					{...register('password')}
					error={errors.password}
				/>
				<Link
					to={'/users/forgot-password'}
					className="text-action-error text-xs pl-3"
				>
					Forgot password?
				</Link>
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
							'Login'
						)
					}
					otherStyles="rounded-xl"
				/>
				<GoogleButton />
			</form>
		</div>
	);
};

export default LoginForm;

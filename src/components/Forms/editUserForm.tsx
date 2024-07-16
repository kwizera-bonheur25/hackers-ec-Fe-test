/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { FaLessThan } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { getRoles } from '../../redux/features/getRolesSlice';
import { roleType } from '../../@types/roleTypes';
import {
	updateUserRoleSchema,
	updateUserRoleSchemaType,
} from '../../validations/updatUserRoleValidations';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DynamicData } from '../../@types/DynamicData';
import { assignRoles } from '../../redux/features/AssignrolesSlice';
import useToast from '../../hooks/useToast';
import { HashLoader } from 'react-spinners';
import { userType } from '../../@types/userType';
import {
	enableAccount,
	setEnable,
	setReason,
	resetField,
} from '../../redux/features/EnableAccountSlice';
import {
	EnableDisableSchema,
	EnableDisableSchemaType,
} from '../../validations/EnableDisable.validation';
import { getUser } from '../../redux/features/getUserSlice';

type userFormType = {
	id?: string;
	useR: userType[];
	successMessage: (message: string) => void;
	errorMessage: (message: string) => void;
};
const EditUserForm = (props: userFormType) => {
	const roles = useAppSelector(
		(state) => state.allRoles.data[state.allRoles.data.length - 1],
	);
	const roleLoading = useAppSelector((state) => state.allRoles.isLoading);
	const dispatch = useAppDispatch();
	const { showErrorMessage, showSuccessMessage } = useToast();
	const id = props.id;
	const isAccountActive = props.useR[0]?.isActive;
	const navigate = useNavigate();

	const { enable, reason } = useAppSelector((state) => state.enableAccount) as {
		enable: string;
		reason: string;
	};

	useEffect(() => {
		if (!roles) {
			dispatch(getRoles()).unwrap();
		}
		dispatch(setEnable(isAccountActive ? 'true' : 'false'));
	}, [dispatch, isAccountActive]);

	const handleNavigation = () => {
		navigate(-1);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<updateUserRoleSchemaType>({
		resolver: zodResolver(updateUserRoleSchema),
	});

	const onSubmit: SubmitHandler<updateUserRoleSchemaType> = async (
		data: updateUserRoleSchemaType,
	) => {
		try {
			const { role } = data;
			if (id) {
				const res = await dispatch(assignRoles({ id, role })).unwrap();
				dispatch(getUser()).unwrap();
				props.successMessage(res.message);
				navigate('/dashboard/users');
			}
		} catch (e) {
			const err = e as DynamicData;
			props.errorMessage(
				err.response.data.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};

	const {
		register: registerReason,
		handleSubmit: handleReasonSubmit,
		formState: { errors: reasonErrors },
	} = useForm<EnableDisableSchemaType>({
		resolver: zodResolver(EnableDisableSchema),
	});

	const handleEnableDisableSubmit = async (newEnable: string) => {
		try {
			if (id) {
				const res = await dispatch(
					enableAccount({ id, isAccountActive: newEnable, reason }),
				).unwrap();
				dispatch(getUser()).unwrap();
				showSuccessMessage(res.message);
				navigate('/dashboard/users');
			}
		} catch (e) {
			const err = e as DynamicData;
			showErrorMessage(
				err.response.data.message ||
					err?.message ||
					'Unknown error occurred! Please try again!',
			);
		}
	};

	const handleEnableDisableClick = () => {
		handleReasonSubmit(() => {
			const newEnable = enable === 'true' ? 'false' : 'true';
			handleEnableDisableSubmit(newEnable);
			dispatch(setEnable(newEnable));
			dispatch(resetField());
		})();
	};

	return (
		<>
			{roleLoading ? (
				<div className="setEditMainDiv   fixed  w-full  top-0 shadow-2xl z-[100] h-full tablet:flex  tablet:items-center tablet:justify-center">
					<div className=" fixed w-full h-full  z-[100]  bg-primary-lightblue/30 backdrop-blur-sm  left-0  top-0">
						<div className=" bg-neutral-whit w-full h-full flex  justify-center items-center z-[200] ">
							<div
								className="flex-1 h-full flex-center flex-col gap-4 z-[500]  "
								data-testid="role-form-loader"
							>
								<HashLoader color="#266491" size={60} role="progressbar" />
								<p className="text-xs">Please wait ...</p>
							</div>
							);
						</div>
					</div>
				</div>
			) : (
				<div className="setEditMainDiv   absolute  top-1 left-1  right-1  w-full z-[500] h-full flex items-center justify-center">
					<div
						className=" fixed w-full h-full  z-[100]  bg-primary-lightblue/30 backdrop-blur-sm  left-0  top-0"
						onClick={handleNavigation}
					></div>
					<div className="setEditSubMainDiv w-[98%] z-[700] rounded-md  top-  flex flex-col bg-neutral-white shadow-2xl px-4  pt-8 pb-8 gap-5 mobile:gap-10 mobile:w-[80%] mobile:m-auto tablet:w-[60%] ipad:w-[50%] mobile:py-7">
						<div className="backButton mobile:w-[78%] mobile:m-auto mobile:items-center">
							<span className="mobile:w-[90%] mobile:m-auto">
								<button
									className="flex items-center border px-4 rounded-2xl  bg-action-success text-neutral-white gap-3 hover:bg-neutral-white hover:text-action-success hover:bg-opacty-40"
									onClick={handleNavigation}
									name="back"
								>
									<span className="text-[11px]">
										{' '}
										<FaLessThan />{' '}
									</span>
									<p className=" font-bold text-[15px]">Back</p>
								</button>
							</span>
						</div>

						<div className="setRolesForm w-full flex  flex-col gap-7     mobile:w-[90%] mobile:m-auto mobile:gap-10">
							<h3 className="w-full text-center text-primary-lightblue font-semibold ipad:text-[22px]">
								Edit Users
							</h3>
							<div className="flex flex-col gap-2 text-[15px] pl-4 mobile:flex-row mobile:gap-[4.5rem] items-center mobile:w-[90%] mobile:m-auto ">
								<p className="  font-semibold">Email</p>
								<p className=" bg-overlay bg-opacity-20 w-[90%]  py-1 px-4 rounded-lg font-[400] mobile:px-5">
									{' '}
									{props.useR &&
										props.useR.map((item: DynamicData) => item.email)}
								</p>
							</div>
							<form
								action=""
								onSubmit={handleSubmit(onSubmit)}
								className=" flex flex-col pl-4 text-[15px] gap-5 mobile:flex-row mobile:w-[90%] mobile:m-auto mobile:items-center "
							>
								<label htmlFor="role" className=" font-semibold">
									Update role
								</label>

								<select
									{...register('role')}
									name="role"
									id="role"
									className="py-2 rounded-lg border pl-5 mobile:py-0 mobile:pl-1 mobile:w-[30%] mobile:h-[1.7rem] mobile:text-[13px]"
								>
									{props.useR &&
										roles?.data &&
										roles?.data
											.filter(
												(item: roleType) => item.id === props.useR[0]?.role,
											)
											.map((item: roleType) => (
												<option key={item.id} value={item.roleName}>
													{item.roleName}
												</option>
											))}
									{props.useR &&
										roles?.data &&
										roles?.data
											.filter(
												(item: roleType) => item.id !== props.useR[0]?.role,
											)
											.map((item: roleType) => (
												<option key={item.id} value={item.roleName}>
													{item.roleName}
												</option>
											))}
								</select>

								<button
									type="submit"
									className="w-full bg-action-success py-2  rounded-lg text-neutral-white mobile:w-[27%] mobile:h-[1.7rem]  mobile:py-0 mobile:text-[13px]"
								>
									update
								</button>
							</form>
							<div className="">
								<p className="mobile:text-wrap text-action-error mobile:px-9">
									{errors.role && <p>{errors.role.message}</p>}
								</p>
							</div>
						</div>
						<div className="disableAccForm w-full flex flex-col text-[15px] gap-2 mobile:w-[85%] mobile:m-auto mobile:items-center">
							<h2 className="font-semibold mobile:w-[90%]">
								Enable/Disable Account
							</h2>
							<textarea
								{...registerReason('reason')}
								value={reason}
								onChange={(e) => dispatch(setReason(e.target.value))}
								className="whiteSpace bg-overlay bg-opacity-20 px-3 py-2 mobile:w-[90%] rounded"
								placeholder="Enter reason for enabling/disabling the account"
							></textarea>
							{reasonErrors.reason && (
								<p className="text-action-error text-[12px] text-right  w-[85%]">
									{reasonErrors.reason.message}
								</p>
							)}
							<span className="mobile:w-[90%] mobile:m-auto items-start justify-start ">
								<button
									type="button"
									onClick={handleEnableDisableClick}
									className={`w-full ${
										enable === 'true' ? 'bg-action-error' : 'bg-action-success'
									} py-2 rounded-lg text-neutral-white mobile:w-[20%] mobile:h-[2rem] mobile:py-0`}
								>
									{enable === 'true' ? 'Disable' : 'Enable'}
								</button>
							</span>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default EditUserForm;

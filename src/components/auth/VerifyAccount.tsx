import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DynamicData } from '../../@types/DynamicData';
import useToast from '../../hooks/useToast';
import { verify } from '../../redux/features/VerifyAccountSlice';
import { useAppDispatch } from '../../redux/hooks/hooks';
import VerifiedCard from '../cards/VerifiedCard';

const VerifyAccount = () => {
	const { showErrorMessage, showSuccessMessage } = useToast();
	const dispatch = useAppDispatch();
	const { token } = useParams();

	useEffect(() => {
		const verifyUser = async () => {
			try {
				const res = await dispatch(verify(token as string)).unwrap();
				showSuccessMessage(res.message);
			} catch (error) {
				const err = error as DynamicData;
				showErrorMessage(
					err?.data?.message ||
						err?.message ||
						'Unknown error occured! Please try again!',
				);
			}
		};
		verifyUser();
	}, [dispatch, showSuccessMessage, showErrorMessage, token]);
	return (
		<>
			<VerifiedCard />
		</>
	);
};

export default VerifyAccount;

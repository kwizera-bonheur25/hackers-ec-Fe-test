import { useParams } from 'react-router-dom';
import EditUserForm from '../../components/Forms/editUserForm';
import GetUser from '../../components/adminDashboard/getUser';
import { userType } from '../../@types/userType';
import { useAppSelector } from '../../redux/hooks/hooks';
import useToast from '../../hooks/useToast';

const EditUser = () => {
	const { id } = useParams<string>();
	const { showErrorMessage, showSuccessMessage } = useToast();
	const users = useAppSelector(
		(state) => state.allUsers.data[state.allUsers.data.length - 1],
	);

	const getUserInfo = () => {
		return users?.data.filter((item: userType) => item?.id === id) || '';
	};
	const useR = getUserInfo();

	return (
		<div className="content  h-full ipad:pl-0 w-full">
			<GetUser />
			<EditUserForm
				id={id}
				useR={useR}
				successMessage={showSuccessMessage}
				errorMessage={showErrorMessage}
			/>
		</div>
	);
};

export default EditUser;

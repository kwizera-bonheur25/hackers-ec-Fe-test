import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserInfoTypes } from '../../@types/userType';
import useToast from '../../hooks/useToast';
import fetchInfo from '../../utils/userDetails';

const ProtectedRoutes = ({ roles }: { roles: Array<string> }) => {
	const navigate = useNavigate();
	const { showErrorMessage } = useToast();
	const decoded = fetchInfo() as UserInfoTypes;
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		if (decoded) {
			if (!roles.includes(decoded?.role as string)) {
				showErrorMessage('You are not allowed to access this route!');
				navigate('/');
			} else {
				setIsAuthorized(true);
			}
		} else {
			showErrorMessage('Please login to continue');
			navigate('/login');
		}
	}, [decoded, navigate, roles, showErrorMessage]);

	return isAuthorized && <Outlet />;
};

export default ProtectedRoutes;

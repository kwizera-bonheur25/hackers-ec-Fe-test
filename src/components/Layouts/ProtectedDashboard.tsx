import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserInfoTypes } from '../../@types/userType';
import useToast from '../../hooks/useToast';
import fetchInfo from '../../utils/userDetails';

const ProtectedDashboard = () => {
	const navigate = useNavigate();
	const { showErrorMessage } = useToast();
	const decoded = fetchInfo() as UserInfoTypes;
	const [isAuthorized, setIsAuthorized] = useState(false);

	useEffect(() => {
		const checkAuthorization = () => {
			if (decoded) {
				if (decoded.role === 'ADMIN') {
					setIsAuthorized(true);
				} else if (decoded.role === 'SELLER') {
					setIsAuthorized(true);
				} else {
					setIsAuthorized(false);
					navigate('/');
				}
			} else {
				showErrorMessage('Please login to continue');
				navigate('/login');
			}
		};

		checkAuthorization();
	}, [decoded, navigate, showErrorMessage]);

	return isAuthorized ? <Outlet /> : null;
};

export default ProtectedDashboard;

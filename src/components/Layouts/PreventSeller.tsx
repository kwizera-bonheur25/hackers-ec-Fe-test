import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserInfoTypes } from '../../@types/userTypes';
import useToast from '../../hooks/useToast';
import fetchInfo from '../../utils/userDetails';

const PreventSeller = ({ roles }: { roles: Array<string> }) => {
	const navigate = useNavigate();
	const { showErrorMessage } = useToast();
	const decoded = fetchInfo() as UserInfoTypes;
	const [isAuthorized, setIsAuthorized] = useState(false);
	const token = localStorage.getItem('access_token');

	const protectSeller = () => {
		if (!token) {
			setIsAuthorized(true);
		}
		if (decoded) {
			if (decoded?.role == 'SELLER') {
				navigate('/dashboard/products');
			} else {
				setIsAuthorized(true);
			}
		}
	};

	useEffect(() => {
		protectSeller();
	}, [decoded, navigate, roles, showErrorMessage]);

	return isAuthorized && <Outlet />;
};

export default PreventSeller;

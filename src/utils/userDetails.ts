import { jwtDecode } from 'jwt-decode';
import { UserInfoTypes } from '../@types/userType';

const fetchInfo = () => {
	const token: string = localStorage.getItem('access_token') || '';
	try {
		return jwtDecode(token) as UserInfoTypes;
	} catch (error) {
		return null;
	}
};

export default fetchInfo;

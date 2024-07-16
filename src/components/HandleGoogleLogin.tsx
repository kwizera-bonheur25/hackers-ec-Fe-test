import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useToast from '../hooks/useToast';
import useToken from '../hooks/useToken';
import { loginSuccess, setError } from '../redux/features/googleSlice';
import { useAppDispatch } from '../redux/hooks/hooks';

const HandleGoogleLogin = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const message = searchParams.get('message');
	const { saveAccessToken } = useToken();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { showErrorMessage, showSuccessMessage } = useToast();

	useEffect(() => {
		if (token) {
			dispatch(loginSuccess({ token, message: message! }));
			saveAccessToken(token);
			showSuccessMessage(message!);
			navigate('/');
		} else {
			dispatch(setError('Please login to continue'));
			showErrorMessage('Please login to continue');
			navigate('/login');
		}
	}, [
		dispatch,
		message,
		navigate,
		saveAccessToken,
		showErrorMessage,
		showSuccessMessage,
		token,
	]);

	return null;
};

export default HandleGoogleLogin;

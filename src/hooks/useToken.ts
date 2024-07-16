import { useState } from 'react';

const useToken = () => {
	const getAccessToken = (): string | undefined => {
		const access_token = localStorage.getItem('access_token');
		if (access_token) return access_token;
	};

	const [accessToken, setAccessToken] = useState<string | undefined>(
		getAccessToken(),
	);

	const saveAccessToken = (userToken: string) => {
		localStorage.setItem('access_token', userToken);
		setAccessToken(userToken);
	};

	return {
		accessToken,
		saveAccessToken,
	};
};

export default useToken;

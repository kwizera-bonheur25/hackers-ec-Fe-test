import { UserProfile } from '../@types/auth/profileTypes';

const filterEmptyStrings = (updatedData: UserProfile) => {
	return Object.entries(updatedData).reduce(
		(realValue: { [key: string]: string }, [key, value]) => {
			if (value !== ' ' && value !== '+250' && value !== '0' && value !== '') {
				realValue[key] = value;
			}
			return realValue;
		},
		{},
	);
};

export default filterEmptyStrings;

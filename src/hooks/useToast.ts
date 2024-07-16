import { toast } from 'sonner';

const useToast = () => {
	const showSuccessMessage = (message: string) => {
		toast.success(message);
	};

	const showErrorMessage = (message: string) => {
		toast.error(message);
	};
	return {
		showSuccessMessage,
		showErrorMessage,
	};
};

export default useToast;

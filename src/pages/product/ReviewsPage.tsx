import { useParams } from 'react-router-dom';
import AllReview from '../../components/product/review/AllReview';
import useToken from '../../hooks/useToken';
import useToast from '../../hooks/useToast';

function ReviewsPage() {
	const { id } = useParams();
	const { accessToken } = useToken();
	const { showErrorMessage, showSuccessMessage } = useToast();

	return (
		<div className="w-full h-full">
			<AllReview
				id={id}
				token={accessToken}
				successMessage={showSuccessMessage}
				Erromesage={showErrorMessage}
			/>
		</div>
	);
}

export default ReviewsPage;

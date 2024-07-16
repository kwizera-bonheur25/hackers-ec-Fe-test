import RegisterLoginContainer from '../../components/Layouts/RegisterLoginContainer';
import RegisterForm from '../../components/auth/RegisterForm';
import RegisterLoginCard from '../../components/cards/RegisterLoginCard';
import useHandleResize from '../../hooks/useHandleResize';

const Register = () => {
	const { show } = useHandleResize();
	return (
		<RegisterLoginContainer>
			{show && (
				<RegisterLoginCard
					cardTitle="Create an account at ShoTrove"
					buttonUrl="/login"
					navDescription="Already have an account?"
					buttonTitle="LOGIN"
				/>
			)}
			<RegisterForm />
		</RegisterLoginContainer>
	);
};

export default Register;

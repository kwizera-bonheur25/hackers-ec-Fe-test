import LoginForm from '../../components/auth/LoginForm';
import RegisterLoginCard from '../../components/cards/RegisterLoginCard';
import RegisterLoginContainer from '../../components/Layouts/RegisterLoginContainer';

const Login = () => {
	return (
		<RegisterLoginContainer>
			<RegisterLoginCard
				cardTitle="Welcome Back!"
				buttonUrl="/register"
				navDescription="Don't have an account?"
				buttonTitle="REGISTER"
			/>
			<LoginForm />
		</RegisterLoginContainer>
	);
};

export default Login;

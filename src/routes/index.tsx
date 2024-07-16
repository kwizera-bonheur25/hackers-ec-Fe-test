import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import About from '../pages/About';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import UserRedirection from '../pages/SellerRedirection';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import UserProfile from '../pages/auth/Profile';
import Contacts from '../pages/Contacts';
import VerifyAccount from '../components/auth/VerifyAccount';
import TwoFactorAuth from '../pages/auth/TwoFactor';
import ForgotPassword from '../pages/forgottenPassword/ForgotPassword';
import ResetPassword from '../pages/resetPassword/resetPassword';
import UserRedirectionPage from '../pages/userRedirection';
import EditUser from '../pages/Admin/EditUserRoles';
import ErrorPage from '../pages/ErrorPage';
import HandleGoogleLogin from '../components/HandleGoogleLogin';
import PreventSeller from '../components/Layouts/PreventSeller';
import ProtectedDashboard from '../components/Layouts/ProtectedDashboard';
import {
	AddProducts,
	DashboardContent,
	DashboardProducts,
	DashboardSingleProducts,
	UserRoles,
	Users,
} from '../utils/DashboardUtils';
import ProtectedRoutes from '../components/Layouts/ProtectedRoutes';
import ProductsPage from '../pages/ProductsPage';
import SingleProduct from '../pages/SingleProduct';
import ReviewsPage from '../pages/product/ReviewsPage';
import UpdatePassword from '../components/Layouts/UpdatePassword';
import Cart from '../pages/carts/Carts';

function Routers() {
	const accessToken = localStorage.getItem('access_token') || '';
	return (
		<>
			<Routes>
				<Route path="/users/forgot-password" element={<ForgotPassword />} />
				<Route path="/users/reset-password" element={<ResetPassword />} />
				<Route
					path="/forgot-password-success"
					element={<UserRedirectionPage />}
				/>

				<Route
					path="/login"
					element={accessToken ? <Navigate to="/" /> : <Login />}
				/>

				<Route path="/google" element={<HandleGoogleLogin />} />
				<Route path="/register" element={<Register />} />
				<Route path="users/account/verify/:token" element={<VerifyAccount />} />
				<Route path="/users/2fa" element={<TwoFactorAuth />} />
				<Route path="/success" element={<UserRedirection />} />
				<Route
					element={<ProtectedRoutes roles={['ADMIN', 'SELLER', 'BUYER']} />}
				>
					<Route path="/profile" element={<UserProfile />} />{' '}
					<Route path="/password" element={<UpdatePassword />} />{' '}
				</Route>
				<Route path="/" element={<Layout />}>
					<Route element={<ProtectedRoutes roles={['BUYER']} />}>
						<Route path="/carts" element={<Cart />} />
					</Route>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="contacts" element={<Contacts />} />
					<Route element={<PreventSeller roles={['']} />}>
						<Route
							element={<ProtectedRoutes roles={['ADMIN', 'SELLER', 'BUYER']} />}
						>
							<Route path="products">
								<Route index element={<ProductsPage />} />
								<Route path=":id" element={<SingleProduct />} />
							</Route>
							<Route path="reviews/:id" element={<ReviewsPage />} />
						</Route>
					</Route>
				</Route>
				<Route element={<DashboardLayout />}>
					<Route path="/dashboard" element={<ProtectedDashboard />}>
						<Route index element={<DashboardContent />} />
						<Route path="products">
							<Route index element={<DashboardProducts />} />
							<Route path=":id" element={<DashboardSingleProducts />} />
							<Route path="new" element={<AddProducts />} />
							<Route path="edit/:id" element={<AddProducts />} />
						</Route>
						<Route path="users">
							<Route index element={<Users />} />
						</Route>
						<Route path="roles">
							<Route index element={<UserRoles />} />
							<Route path=":id" element={<EditUser />} />
						</Route>
					</Route>
				</Route>
				<Route path="/error" element={<ErrorPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default Routers;

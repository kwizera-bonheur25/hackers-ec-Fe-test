import { configureStore } from '@reduxjs/toolkit';
import AssignrolesSlice from './features/AssignrolesSlice';
import cartSlice from './features/cartSlice';
import categorySlice from './features/categorySlice';
import deleteProductSlice from './features/deleteProductSlice';
import EnableAccountSlice from './features/EnableAccountSlice';
import forgottonSlice from './features/forgottonSlice';
import getRolesSlice from './features/getRolesSlice';
import getUserSlice from './features/getUserSlice';
import googleSlice from './features/googleSlice';
import { loginReducer } from './features/loginSlice';
import navReducer from './features/navSlice';
import notificationSlice from './features/notificationSlice';
import { otpReducer } from './features/OTPSlice';
import productSlice from './features/productSlice';
import RegisterSlice from './features/RegisterSlice';
import resetPasswordSlice from './features/resetSlice';
import SearchSlice from './features/SearchSlice';
import profileSlice from './features/userUpdateSlice';
import VerifyAccountSlice from './features/VerifyAccountSlice';

import CreateReviewSlice from './features/CreateReviewSlice';
import editReviewSlice from './features/editReviewSlice';
import fetchReviewSlice from './features/getReviewSice';
import passwordSlice from './features/passwordUpdateSlice';
import chatSlice from './features/chatSlice';

export const store = configureStore({
	reducer: {
		login: loginReducer,
		register: RegisterSlice,
		nav: navReducer,
		profile: profileSlice,
		verifyAccount: VerifyAccountSlice,
		otp: otpReducer,
		categories: categorySlice,
		product: productSlice,
		forgotPassword: forgottonSlice,
		resetPassword: resetPasswordSlice,
		allUsers: getUserSlice,
		updateRoles: AssignrolesSlice,
		allRoles: getRolesSlice,
		google: googleSlice,
		notifications: notificationSlice,
		enableAccount: EnableAccountSlice,
		search: SearchSlice,
		deleteProduct: deleteProductSlice,
		createReview: CreateReviewSlice,
		fetchReview: fetchReviewSlice,
		editReview: editReviewSlice,
		updatePassword: passwordSlice,
		cart: cartSlice,
		chat: chatSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GoogleState {
	isAuthenticated: boolean;
	token: string | null;
	message: string | null;
	error: string | null;
}

const initialState: GoogleState = {
	isAuthenticated: false,
	message: null,
	token: null,
	error: null,
};

const googleSlice = createSlice({
	name: 'google',
	initialState,
	reducers: {
		loginSuccess: (
			state,
			action: PayloadAction<{ token: string; message: string }>,
		) => {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.message = action.payload.message;
			state.error = null;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			state.message = null;
			state.error = null;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { loginSuccess, logout, setError } = googleSlice.actions;

export default googleSlice.reducer;

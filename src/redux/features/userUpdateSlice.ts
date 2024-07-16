/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API from '../../utils/api';

import { DynamicData } from '../../@types/DynamicData';
import { UserProfile, ProfileState } from '../../@types/auth/profileTypes';

export const fetchUserProfile = createAsyncThunk(
	'fetchUserProfile',
	async (_, { rejectWithValue }) => {
		try {
			const { data } = await API.get('/profile');
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);
export const updateUserProfile = createAsyncThunk(
	'updateUserProfile',
	async (updatedProfile: UserProfile, { rejectWithValue }) => {
		try {
			const response = await API.patch('/profile/', updatedProfile);
			const { data } = response;

			return data;
		} catch (error: any) {
			if (error.response && error.response.status === 400) {
				return rejectWithValue(error.response.data || 'Bad Request');
			} else {
				return rejectWithValue(error.message);
			}
		}
	},
);
export const updateUserProfileImage = createAsyncThunk(
	'updateUserProfileImage',
	async (image: File, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			formData.append('profileImage', image);

			const token = localStorage.getItem('token');

			const response = await API.patch('/profile', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			});
			const { data } = response;
			return data;
		} catch (error: any) {
			if (error.response && error.response.status === 400) {
				return rejectWithValue(error.response.data || 'Bad Request');
			} else {
				return rejectWithValue(error.message);
			}
		}
	},
);
const initialState: ProfileState = {
	isLoading: false,
	data: null,
	error: null,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchUserProfile.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload.data;
		});
		builder.addCase(
			fetchUserProfile.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
		builder.addCase(updateUserProfile.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(updateUserProfile.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload.data;
		});
		builder.addCase(
			updateUserProfile.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload.m;
			},
		);
		builder.addCase(updateUserProfileImage.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(updateUserProfileImage.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload.data;
		});
		builder.addCase(
			updateUserProfileImage.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload.m;
			},
		);
	},
});

export default profileSlice.reducer;

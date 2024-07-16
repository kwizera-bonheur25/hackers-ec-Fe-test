/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DynamicData } from '../../@types/DynamicData';
import API from '../../utils/api';
interface rolesState {
	data: DynamicData[];
	isLoading: boolean;
	error: string | null;
}
interface DatatType {
	id: string;
	role: string;
}
const initialState: rolesState = {
	data: [],
	isLoading: false,
	error: null,
};
export const assignRoles = createAsyncThunk(
	'assignRoles',
	async ({ id, role }: DatatType, { rejectWithValue }) => {
		try {
			const { data } = await API.post(`/users/${id}/roles`, { role });
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

const AssignrolesSlice = createSlice({
	name: 'assignRoles',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(assignRoles.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(
			assignRoles.fulfilled,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.data = [...state.data, action.payload];
				state.error = null;
			},
		);
		builder.addCase(
			assignRoles.rejected,
			(state, action: PayloadAction<any>) => {
				state.isLoading = false;
				state.error = action.payload?.data?.message;
			},
		);
	},
});
export default AssignrolesSlice.reducer;

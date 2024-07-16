import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { DynamicData } from '../../@types/DynamicData';
import { EnableAccountState } from '../../@types/admin/AccounEnabling';

export interface EnableAccountType {
	id?: string;
	isAccountActive: string;
	reason: string;
}

export const enableAccount = createAsyncThunk<
	EnableAccountResponse,
	EnableAccountType,
	{ rejectValue: DynamicData }
>(
	'enableAccount',
	async (
		{ id, isAccountActive, reason }: EnableAccountType,
		{ rejectWithValue },
	) => {
		try {
			const { data } = await API.patch(`/users/${id}/account-status`, {
				isAccountActive,
				reason,
			});
			return data;
		} catch (error) {
			return rejectWithValue((error as DynamicData).response);
		}
	},
);

const initialEnableAccountState: EnableAccountState = {
	isLoading: false,
	error: null,
	message: null,
	enable: 'false',
	reason: '',
};

type EnableAccountResponse = {
	message: string;
	status: string;
};

const enableAccountSlice = createSlice({
	name: 'enableAccount',
	initialState: initialEnableAccountState,
	reducers: {
		setEnable: (state, action: PayloadAction<string>) => {
			state.enable = action.payload;
		},
		setReason: (state, action: PayloadAction<string>) => {
			state.reason = action.payload;
		},
		resetField: (state) => {
			state.reason = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(enableAccount.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				enableAccount.fulfilled,
				(state, action: PayloadAction<EnableAccountResponse>) => {
					state.isLoading = false;
					state.message = action.payload.message;
					state.error = null;
				},
			)
			.addCase(
				enableAccount.rejected,
				(state, action: PayloadAction<DynamicData | undefined>) => {
					state.isLoading = false;
					state.error = action.payload?.data?.message || 'An error occurred';
				},
			);
	},
});
export const { setEnable, setReason, resetField } = enableAccountSlice.actions;
export default enableAccountSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface NavState {
	openModel: boolean;
}

const initialState: NavState = {
	openModel: false,
};

const navSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		toggleModel(state) {
			state.openModel = !state.openModel;
		},
	},
});

export const { toggleModel } = navSlice.actions;
export default navSlice.reducer;

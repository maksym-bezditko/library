import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modal: "none",
	deleteId: null,
	menu: false,
	books: []
}


const slice = createSlice({
	name: "general",
	initialState,
	reducers: {
		setModal: (state, action) => {
			state.modal = action.payload;
		},
		setMenu: (state, action) => {
			state.menu = action.payload
		},
		setBooks: (state, action) => {
			state.books = action.payload
		},
		setDeleteId: (state, action) => {
			state.deleteId = action.payload
		}
	}
})

export const { setModal, setMenu, setBooks, setDeleteId } = slice.actions;
export default slice.reducer;
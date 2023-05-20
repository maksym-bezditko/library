import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	modal: "none",
	deleteId: null,
	menu: false,
	books: [],
	isDeleteInProgress: false,
	user: {
		id: null,
		firstName: null,
		lastName: null,
		email: null,
		password: null,
		books: [],
		quotes: [],
	}
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
		},

		setUser: (state, action) => {
			state.user = action.payload
		},

		setIsDeleteInProgress: (state, action) => {
			state.isDeleteInProgress = action.payload
		}
	}
})

export const {
	setModal,
	setMenu,
	setBooks,
	setDeleteId,
	setUser,
	setIsDeleteInProgress,
} = slice.actions;

export default slice.reducer;
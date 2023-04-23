import { createSelector } from "@reduxjs/toolkit";

export const modalSelector = createSelector(
	state => state.general.modal,
	(modal) => modal
)

export const authSelector = createSelector(
	state => state.general.auth,
	(auth) => auth
)

export const menuSelector = createSelector(
	state => state.general.menu,
	menu => menu
)

export const booksSelector = createSelector(
	state => state.general.books,
	books => books
)

export const bookToDeleteSelector = createSelector(
	state => state.general.deleteId,
	bookToDelete => bookToDelete
)

export const quotesSelector = createSelector(
	state => state.general.books,
	books => {
		let arr = [];

		for (let i of books) {
			arr.concat(i?.quotes)
		}

		return arr;
	}
)
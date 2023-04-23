import React, { useCallback } from 'react';
import Modal from '../../HOCs/Modal/Modal';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth } from '../..';
import { db } from '../..';
import { ref, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import "./form.scss";
import { useDispatch } from 'react-redux';
import { setModal } from '../../slices/slice';
import useBookList from '../../hooks/useBookList';

const validationSchema = Yup.object({
	quote: Yup.string()
		.required('Required'),
	book: Yup.string()
		.required('Required')
});


function AddQuoteModal({visible}) {
	const dispatch = useDispatch();

	const { books } = useBookList();

	const handleSubmit = useCallback((values, { resetForm, setSubmitting }) => {
		const {quote, book} = values;
		const [bookTitle, bookId] = book.split("%")
		const newId = uuidv4()
		const uid = auth.currentUser.uid;
		const timestamp = +new Date();

		try {
			const postData = {
				book: bookTitle,
				addedFrom: bookId,
				quote,
				id: newId,
				timestamp
			};

			const updates = {};

			updates[`/data/users/${uid}/books/${bookId}/quotes/${newId}`] = postData;
			updates[`/data/users/${uid}/quotes/${newId}`] = postData;

			update(ref(db), updates);

			dispatch(setModal("none"))

		} catch (e) {
			alert(e)
		}
		resetForm()
		setSubmitting(false)
	}, [dispatch]);

	const renderForm = useCallback(({isSubmitting}) => (
		<Form className="form">
			<h1>Wanna add a quote?</h1>

			<div className="group">
				<label htmlFor="quote">Quote</label>
				<Field name="quote" type="text" className="input"/>
				<ErrorMessage name="quote">
					{msg => <div className="error-message">{msg}</div>}
				</ErrorMessage>
			</div>

			<div className="group">
				<label htmlFor="book">From</label>
				<Field name="book" type="text" as="select" className="book-select">
					<option style={{display: "none"}} value="">Select a book</option>
					{books.map(item => {
						return <option key={item.id} value={item.title + "%" + item.id}>{item.title}</option>
					})}
				</Field>
				<ErrorMessage name="book">
					{msg => <div className="error-message">{msg}</div>}
				</ErrorMessage>
			</div>

			<button disabled={isSubmitting} type="submit">Add one!</button>
		</Form>
	), [books]);

  	return (
	 <Modal visible={visible}>
		<Formik
			initialValues={{ quote: '', book: ""}}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
			validateOnChange
			validateOnBlur
		>
			{renderForm}
		</Formik>
	 </Modal>
  )
}

export default AddQuoteModal;
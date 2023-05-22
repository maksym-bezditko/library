import React, { useCallback } from 'react';
import Modal from '../../HOCs/Modal/Modal';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid';
import "./form.scss";
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../selectors/selectors';
import { useRequest } from '../../hooks/useRequest';
import { setModal } from '../../slices/slice';

const validationSchema = Yup.object({
	quote: Yup.string()
		.required('Required'),
	book: Yup.string()
		.required('Required')
});


function AddQuoteModal({visible}) {
	const dispatch = useDispatch();

	const user = useSelector(userSelector);

	const books = user.books;

	const { addUserQuote } = useRequest();

	const handleSubmit = useCallback((values, { resetForm, setSubmitting }) => {
		const { quote, book } = values;

		addUserQuote(user.id, {
			id: uuidv4(),
			content: quote,
			associatedWithBookId: book,
			date: new Date().toDateString(),
		})

		dispatch(setModal('none'));

		resetForm();
		setSubmitting(false);
	}, [addUserQuote, dispatch, user.id]);

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
						return <option key={item.id} value={item.id}>{item.title}</option>
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
				initialValues={{ quote: '', book: '' }}
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
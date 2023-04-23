import React, { useCallback } from 'react'
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

export const statuses = {
	Read: "✔️",
	Reading: "🟢",
	Planning: "📚",
	Abandoned: "🟡"
}

const validationSchema = Yup.object({
	bookUrl: Yup.string()
		.required('Required')
		.matches(/([a-z\-_0-9/:.]*\.(jpg|jpeg|png|gif))/i, "Invalid URL"),
	title: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required')
});

const renderForm = ({isSubmitting}) => (
	<Form className="form" onClick={e => e.stopPropagation()}>
		<h1>Wanna add a book?</h1>
		<div className="group">
			<label htmlFor="bookUrl">Book Cover (URL)</label>
			<Field name="bookUrl" type="text" className='bookUrl input' />
			<ErrorMessage name="bookUrl">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

		<div className="group">
			<label htmlFor="title">Title</label>
			<Field name="title" type="text" className="input"/>
			<ErrorMessage name="title">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

		<div className="group">
			<label htmlFor="status">From</label>
			<Field name="status" type="text" as="select" className="book-select">
				<option style={{display: "none"}} value="">Select a stage</option>
				{Object.keys(statuses).map(item => {
					return <option value={item} key={item}>{item}</option>
				})}
			</Field>
			<ErrorMessage name="book">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

		<button disabled={isSubmitting} type="submit">Add one!</button>

	</Form>
);

function AddModal({visible}) {
	const dispatch = useDispatch();

	const handleSubmit = useCallback((values, { resetForm, setSubmitting }) => {
		const {bookUrl, title, status} = values;
		const newId = uuidv4()
		const uid = auth.currentUser.uid;
		const id = title.split(" ").join("-").toLowerCase() + "-" + newId.slice(0, 3);
		const timestamp = +new Date();

		try {
			const postData = {
				id,
				title,
				url: bookUrl,
				timestamp,
				status
			};

			const updates = {};
			updates[`/data/users/${uid}/books/` + id] = postData;
			dispatch(setModal("none"))
			update(ref(db), updates);
		} catch (e) {
			alert(e)
		}

		resetForm()
		setSubmitting(false)
	}, [dispatch]);

	return (
		<Modal visible={visible}>
			<Formik
				initialValues={{ bookUrl: '', title: '', status: ''}}
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

export default AddModal
import React, { useCallback } from 'react'
import Modal from '../../HOCs/Modal/Modal';
import { Field, Form, Formik, ErrorMessage } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { auth } from '../..';
import "./form.scss";
import { useDispatch } from 'react-redux';
import { setModal } from '../../slices/slice';

const renderForm = ({isSubmitting}) => (
	<Form className="form">

		<h1>Login Form</h1>
		<div className="group">
			<label htmlFor="email">Email Address</label>
			<Field name="email" type="text" className="input"/>
			<ErrorMessage name="email">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

		<div className="group">
			<label htmlFor="password">Password</label>
			<Field name="password" type="password" className="input"/>
			<ErrorMessage name="password">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>
		<button disabled={isSubmitting} type="submit">Log in!</button>

	</Form>
);

const validationSchema = Yup.object({
	email: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required')
		.matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid email"),
	password: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Required')
});

function LoginModal({visible}) {
	const dispatch = useDispatch();

	const handleSubmit = useCallback(async (values, { setSubmitting, resetForm }) => {
		const { email, password } = values;

		try {
			await signInWithEmailAndPassword(auth, email, password);
			dispatch(setModal("none"))
		} catch (e) {
			alert("Sorry, something came up, try agaain or later.")
		}


		setSubmitting(false);
		resetForm();
	}, [dispatch]);

	return (
		<Modal visible={visible}>
			<Formik
				initialValues={{ email: '', password: '' }}
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

export default LoginModal
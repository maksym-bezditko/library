import "./form.scss";
import React, { useCallback } from 'react'
import Modal from '../../HOCs/Modal/Modal';
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setModal } from "../../slices/slice";
import { useRequest } from "../../hooks/useRequest";
import { generateUserId } from "../../utils/generateUserId";

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validationSchema = Yup.object({
	email: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Email required')
		.matches(emailRegExp, "Invalid email"),
	password: Yup.string()
		.min(5, "Can't be less than five symbols")
		.required('Password required'),
	name: Yup.string()
		.min(1, "One letter can't be a name")
		.required("Name required"),
	lastName: Yup.string()
		.min(1, "One letter can't be a name")
		.required("Lastname required")
});

const renderForm = ({isSubmitting}) => (
	<Form className="form register-form">

		<h1>Registration Form</h1>
		<div className="group">
			<label htmlFor="email">Email Address</label>
			<Field name="email" type="text" className="input"/>
			<ErrorMessage name="email">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

		<div className="group">
			<label htmlFor="name">Name</label>
			<Field name="name" type="text" className="input"/>
			<ErrorMessage name="name">
				{msg => <div className="error-message">{msg}</div>}
			</ErrorMessage>
		</div>

		<div className="group">
			<label htmlFor="lastName">Lastname</label>
			<Field name="lastName" type="text" className="input"/>
			<ErrorMessage name="lastName">
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
		<button disabled={isSubmitting} type="submit" onClick={(e) => e.stopPropagation()}>Register!</button>

	</Form>
);

const RegisterModal = ({ visible }) => {
	const dispatch = useDispatch();

	const { registerUser } = useRequest();

	const handleSubmit = useCallback(async (values, { setSubmitting, resetForm }) => {
		const { email, password, name, lastName } = values;

		try {
			try {
				const res = await registerUser(generateUserId(), name, lastName, email, password);

				console.log(res);

				dispatch(setModal("none"))
			} catch (e) {
				alert("Sorry, something came up, try again or later.")
			}
		} catch (e) {
			alert("Sorry, something came up, try again or later.")
		}

		setSubmitting(false);
		resetForm();
	}, [dispatch, registerUser]);

	return (
		<Modal visible={visible}>
			<Formik
				initialValues={{ email: '', password: '', name: '', lastName: '' }}
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

export default RegisterModal;
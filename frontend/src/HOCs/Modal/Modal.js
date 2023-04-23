import React from 'react';
import "./Modal.scss";
import { useDispatch } from 'react-redux';
import { setModal } from '../../slices/slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { modalSelector } from '../../selectors/selectors';

const Modal = ({visible, children}) => {
	const dispatch = useDispatch();

	const modalStatus = useSelector(modalSelector);

	useEffect(() => {
		if (modalStatus !== "none") {
			document.body.style.overflow = 'hidden';
		}
		return () => document.body.style.overflow = 'unset';
	}, [modalStatus]);

  	return (
	 	<div className={`modal-wrapper${visible ? "" : " hidden"}`} onClick={() => dispatch(setModal("none"))}>
			<div className={`modal-window${visible ? "" : " hidden"}`} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
	 	</div>
  )
}

export default Modal;
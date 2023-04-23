import React, {useState, useCallback} from 'react'
import Modal from '../../HOCs/Modal/Modal';
import { auth } from '../..';
import { db } from '../..';
import { ref, update, remove } from "firebase/database";
import "./form.scss";
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../slices/slice';
import { modalSelector, bookToDeleteSelector } from '../../selectors/selectors';
import { useNavigate } from 'react-router-dom';
import { setDeleteId } from '../../slices/slice';
import useQuoteList from '../../hooks/useQuoteList';

export const deleteBookById = (id) => {
	const userId = auth.currentUser.uid;
	const itemRef = ref(db, `data/users/${userId}/books/${id}`);

	return remove(itemRef);
}

function DeleteQuoteModal({visible}) {
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const bookToDelete = useSelector(bookToDeleteSelector);
	const modal = useSelector(modalSelector)

	const [checked, setChecked] = useState(false)

	const { uid } = auth.currentUser;

	const { quotes } = useQuoteList();

	const handleButtonClick = useCallback(async () => {
		dispatch(setModal(null))

		try {
			navigate("/")
			await deleteBookById(bookToDelete)
			if (!checked) {
				const postData = quotes.filter(item => item.addedFrom !== bookToDelete)

				const updates = {};
				updates[`/data/users/${uid}/quotes/`] = postData;
				update(ref(db), updates);
			}
			dispatch(setDeleteId(null))
		} catch (e) {
			dispatch(setDeleteId(null))
			alert("Sorry, couldn't remove the book, try one more time.")
		}
	}, [bookToDelete, checked, dispatch, navigate, quotes, uid]);

	const handleCheckboxClick = useCallback(() => setChecked(!checked), [checked]);

  	return (
		<Modal visible={visible}>
			<div className='form confirm'>
				<h1 className='confirm-question transition-none'>Are you sure?</h1>

				<div className="keep-input transition-none">
					<input className='keep transition-none' id="keep" type="checkbox" name="keep" onClick={handleCheckboxClick} value={checked}/>
					<label className="keep-label transition-none" htmlFor="keep">Keep related quotes</label>
				</div>

				<div className='buttons'>
					<button
						className={`button${modal === "delete-quote" ? " add-quote-button transition-none" : ""}`}
						onClick={handleButtonClick}
					>
						Yes
					</button>

					<button className={`button${modal === "delete-quote" ? " add-quote-button delete-quote-button-1 transition-none" : ""}`}
						onClick={() => {
							dispatch(setModal(null))
							dispatch(setDeleteId(null))
						}}
					>
						No
					</button>
				</div>

			</div>
		</Modal>
  )
}

export default DeleteQuoteModal;
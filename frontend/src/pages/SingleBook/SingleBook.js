import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../..';
import { useList } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database';
import { db } from '../..';
import { InfinitySpin } from 'react-loader-spinner';
import "./SingleBook.scss";
import { statuses } from '../../components/Popups/AddModal';
import { useDispatch } from 'react-redux';
import { setModal } from '../../slices/slice';
import { setDeleteId } from '../../slices/slice';

const SingleBook = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()

	let { id } = useParams();

	const uid = auth.currentUser?.uid;

	const [snapshots, loading, error] = useList(ref(db, `data/users/${uid}/books`));

	const book = useMemo(() => {
		let arr = [];
		for (let i of snapshots) {
			arr.push(i.val())
		}
		let item = arr.find(item => item.id === id);
		if (item) return item;
		navigate("/books")

	}, [snapshots, id, navigate])

	const [quotesSnapshots] = useList(ref(db, `data/users/${uid}/quotes`));

	const quotes = useMemo(() => {
		let arr = [];
		for (let i of quotesSnapshots) {
			arr.push(i.val())
		}
		return arr.filter(item => item.addedFrom === id);

	}, [quotesSnapshots, id])

	if (loading || error) {
		return (
			<div className="books">
				<InfinitySpin
					width='200'
					color="#4fa94d"
				/>
			</div>
		)
	}

	return (
		<div className="single-book-wrapper">
			<div className='single-book-avatar'>
				<img className='book-cover' src={book.url} alt="book cover"/>
				<div className="button-wrapper">
					<button
						className='button add-quote-button single-book-button'
						onClick={() => dispatch(setModal("add-quote"))}
						>
						Add a quote
					</button>
					<button
						className='button add-quote-button delete-quote-button single-book-button'
						onClick={() => {
							dispatch(setDeleteId(id))
							dispatch(setModal("delete-quote"))
						}}
						>
						Delete a book
				</button>
				</div>
			</div>
			<div className='information'>
				<div className='book-name'>
					{book.title}

				</div>
				<div className="book-status"><div className='status-wrapper'>{statuses[book.status]} {book.status.toLowerCase()}</div></div>
				<div className='book-date'>
					Added on {new Date(book.timestamp).toDateString().slice(3)} by <span>{auth.currentUser.displayName}</span>
				</div>
				{quotes.length === 0 ? "No related quotes" : (
					<div className='related-quotes'>
						<div className='related-quotes-title'>Related quotes:</div>
						<ul>
							{quotes.map(item => {
								return <li className='related-quote' key={item.id}>{item.quote}</li>
							})}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

export default SingleBook
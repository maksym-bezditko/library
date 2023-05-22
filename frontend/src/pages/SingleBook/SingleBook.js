import React from 'react';
import "./SingleBook.scss";
import { useDispatch } from 'react-redux';
import { setModal } from '../../slices/slice';
import { setDeleteId } from '../../slices/slice';
import { userSelector } from '../../selectors/selectors';
import { useSelector } from 'react-redux';
import { statuses } from '../../components/Popups/AddModal';
import { useParams } from 'react-router-dom';

const SingleBook = () => {
	const dispatch = useDispatch();

	let { id } = useParams();

	const user = useSelector(userSelector);

	const books = user.books;

	const book = books.find(item => item.id === id);

	const quotes = user.quotes.filter(item => item.associatedWithBookId === id);

	return (
		<div className="single-book-wrapper">
			<div className='single-book-avatar'>
				<img className='book-cover' src={book.coverUrl} alt="book cover"/>
				<div className="button-wrapper-for-single-book">
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
					Added on {new Date(book.date).toDateString().slice(3)} by <span>{user.firstName + ' ' + user.lastName}</span>
				</div>
				<div className='book-date book-author'>
					Authored by <span>{book.author}</span>
				</div>
				{quotes.length === 0 ? "No related quotes" : (
					<div className='related-quotes'>
						<div className='related-quotes-title'>Related quotes:</div>
						<ul>
							{quotes.map(item => {
								return <li className='related-quote' key={item.id}>{item.content}</li>
							})}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

export default SingleBook
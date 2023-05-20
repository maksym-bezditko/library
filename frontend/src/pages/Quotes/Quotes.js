import { useDispatch, useSelector } from "react-redux";
import Quote from "../../components/Quote/Quote";
import "./Quotes.scss";
import { setModal } from "../../slices/slice";
import { booksSelector, quotesSelector } from "../../selectors/selectors";

const Quotes = () => {
	const dispatch = useDispatch()

	const books = useSelector(booksSelector);

	const quotes = useSelector(quotesSelector);

	return (
		<div className="quotes">
			<div className="button-wrapper">
				{ books.length === 0 && quotes.length === 0 && <p className="warning">In order to add a quote, add a book first</p>}
				{ books.length !== 0 && (
					<button
						className='button add-quote-button'
						onClick={() => dispatch(setModal("add-quote"))}
						>
						Add a quote
					</button>
				)}
			</div>

			{quotes.map((item) => {
				const associatedBookTitle = books.find(book => book.id === item.associatedWithBookId)?.title || '';

				return (
					<Quote key={item.id} book={associatedBookTitle} id={item.id} date={item.date} quote={item.content} />
				);
			})}
		</div>
	);
}

export default Quotes;
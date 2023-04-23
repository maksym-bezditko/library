import { useDispatch } from "react-redux";
import Quote from "../../components/Quote/Quote";
import "./Quotes.scss";
import { setModal } from "../../slices/slice";
import { useLayoutEffect } from "react";
import { setBooks } from "../../slices/slice";
import { Dna } from "react-loader-spinner";
import { sortListByDateDescending } from "../../utils/sortFunctions";
import { CSSTransition } from "react-transition-group";
import useBookList from "../../hooks/useBookList";
import useQuoteList from "../../hooks/useQuoteList";

const Quotes = () => {
	const dispatch = useDispatch()

	const {books, b_loading} = useBookList();
	const {quotes, q_loading, q_error} = useQuoteList();

	useLayoutEffect(() => {
		dispatch(setBooks(books))
	}, [dispatch, books])

	if (q_loading || q_error || b_loading) {
		return (
			<div className="books">
				<Dna
					visible={true}
					height="100"
					width="100"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper"
				/>
			</div>
		);
	}

	return (
		<div className="quotes">
			<div className="button-wrapper">
				{ books.length === 0 && <p className="warning">In order to add a quote, add a book first</p>}
				{ books.length !== 0 && (
					<button
						className='button add-quote-button'
						onClick={() => dispatch(setModal("add-quote"))}
						>
						Add a quote
					</button>
				)}
			</div>

			{quotes.sort(sortListByDateDescending).map((item) => {
				return (
					<CSSTransition
						mountOnEnter
						unmountOnExit
						key={item.id}
						timeout={500}
						classNames="quote"
						in={true}
						appear={true}
					>
						<Quote book={item.book} id={item.id} timestamp={item.timestamp} quote={item.quote}/>
					</CSSTransition>
				);
			})}
		</div>
	);
}

export default Quotes;
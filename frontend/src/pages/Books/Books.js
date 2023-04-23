import { Book } from "../../components/Book/Book";
import "./Books.scss";
import { useLayoutEffect } from "react";
import { auth } from "../..";
import { Dna } from  'react-loader-spinner'
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../slices/slice";
import { sortListByDateDescending } from "../../utils/sortFunctions";
import { booksSelector } from "../../selectors/selectors";
import useBooksList from "../../hooks/useBookList";

const Books = () => {
	const dispatch = useDispatch()

	const list = useSelector(booksSelector);

	const {books, b_loading, b_error} = useBooksList();
	const user = auth.currentUser;

	useLayoutEffect(() => {
		dispatch(setBooks(books))
	}, [dispatch, books])

	if (b_loading || b_error) {
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
		<div className="books">
				{list.length === 0 && user ? "No books yet" : null}
				{[...list].sort(sortListByDateDescending).map((item) => {
					return <Book key={item.id} link={item.url} title={item.title} id={item.id} timestamp={item.timestamp} status={item.status}/>
				})}
		</div>
	);
}

export default Books;
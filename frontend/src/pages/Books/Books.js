import { Book } from "../../components/Book/Book";
import "./Books.scss";
import { useSelector } from "react-redux";
import { booksSelector } from "../../selectors/selectors";
import { userSelector } from "../../selectors/selectors";
import { deleteInProgressSelector } from "../../selectors/selectors";
import { Dna } from "react-loader-spinner";
import Filter from "../../components/Filter/Filter";
import { useState } from "react";

const Books = () => {
	const user = useSelector(userSelector);

  const isAuthenticated = !!user.id;

	const list = useSelector(booksSelector);

	const [filteredBooks, setFilteredBooks] = useState(list);

	const isDeleteInProgress = useSelector(deleteInProgressSelector);

	const noBookMessage = list.length > 0 ? 'No such books' : 'No books yet';

	if (isDeleteInProgress) {
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
		<>
			<Filter items={list} setItems={setFilteredBooks} />
			<div className="books">
					{filteredBooks.length === 0 && isAuthenticated ? noBookMessage : (
						filteredBooks.map((item) => {
							return <Book key={item.id} link={item.coverUrl} title={item.title} id={item.id} date={item.date} status={item.status} author={item.author}/>
						})
					)}
			</div>
		</>
	);
}

export default Books;
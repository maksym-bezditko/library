import { Book } from "../../components/Book/Book";
import "./Books.scss";
import { useSelector } from "react-redux";
import { booksSelector } from "../../selectors/selectors";
import { userSelector } from "../../selectors/selectors";
import { deleteInProgressSelector } from "../../selectors/selectors";
import { Dna } from "react-loader-spinner";

const Books = () => {
	const user = useSelector(userSelector);

  	const isAuthenticated = !!user.id;

	const list = useSelector(booksSelector);

	const isDeleteInProgress = useSelector(deleteInProgressSelector);

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
		<div className="books">
				{list.length === 0 && isAuthenticated ? "No books yet" : null}
				{[...list].map((item) => {
					return <Book key={item.id} link={item.coverUrl} title={item.title} id={item.id} date={item.date} status={item.status}/>
				})}
		</div>
	);
}

export default Books;
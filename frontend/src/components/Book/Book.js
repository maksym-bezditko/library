import "./Book.scss";
import { NavLink } from "react-router-dom";
import { statuses } from "../Popups/AddModal";

export const Book = ({id, title, link, date, status, author}) => {
	const createdDate = new Date(date);

	return (
		<NavLink to={`/books/${id}`} className="book-wrapper" >
			<div className="image">
				<img src={link} alt="bookCover" className="bookCover"/>
			</div>

			<div className="info">
				<div className="title">{title}</div>

				<div className="additional">
					<div className="status">{statuses[status]} {status.toLowerCase()}</div>
					<div className="date">{createdDate.toDateString().slice(3)}</div>
				</div>

				<div className="author">{author}</div>
			</div>
		</NavLink>
	)
}
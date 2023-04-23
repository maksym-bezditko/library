import "./Book.scss";
import { Link, Navigate } from "react-router-dom";
import { statuses } from "../Popups/AddModal";

export const Book = ({id, title, link, timestamp, status}) => {
	const createdDate = new Date(timestamp);

	return (
		<Link to={`/books/${id}`} className="book-wrapper" onClick={<Navigate to={`/books/${id}`}/>}>
			<div className="image">
				<img src={link} alt="bookCover" className="bookCover"/>
			</div>

			<div className="info">
				<div className="title">{title}</div>

				<div className="additional">
					<div className="status">{statuses[status]} {status.toLowerCase()}</div>
					<div className="date">{createdDate.toDateString().slice(3)}</div>
				</div>
			</div>
		</Link>
	)
}
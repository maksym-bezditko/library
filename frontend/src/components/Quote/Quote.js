import "./Quote.scss";
import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useMemo } from "react";
import { useRequest } from "../../hooks/useRequest";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors/selectors";

function Quote({book, quote, id, date}) {
	const createdDate = useMemo(() => new Date(date), [date]);

	const user = useSelector(userSelector);

	const { deleteUserQuote } = useRequest();

	const handleIconClick = useCallback((quoteId) => {
		try {
			deleteUserQuote(user.id, id)
		} catch (e) {
			alert("Sorry, couldn't remove the book, try one more time.")
		}
	}, [deleteUserQuote, id, user.id]);

  	return (
		<div className="quote-wrapper">
			<div className="quote">
				<blockquote className="quote-text">
					{quote}
				</blockquote>
				<div className="additional">
					<div className="quote-info additional-item">
						Added {createdDate.toDateString().slice(3)} from {book ? `${book}` : 'deleted book'}
					</div>
					<div>
						<FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={handleIconClick}/>
					</div>
				</div>
			</div>
	 	</div>
  	)
}

export default Quote
import React from 'react'
import { useParams } from 'react-router-dom';

const SingleQuote = () => {
	const { quoteId } = useParams();

  return (
		<div>
			Single Quote {quoteId}
		</div>
  );
}

export default SingleQuote;
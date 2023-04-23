import { auth, db } from "..";
import { useList } from "react-firebase-hooks/database";
import { useMemo } from "react";
import { ref } from "firebase/database";

const useQuoteList = () => {
	const uid = auth.currentUser?.uid;

	const [snapshots, q_loading, q_error] = useList(ref(db, `data/users/${uid}/quotes`));

	const quotes = useMemo(() => {
		let arr = [];

		if (q_loading || q_error) return arr;

		for (let i of snapshots) {
			arr.push(i.val())
		}

		return arr;
	}, [q_error, q_loading, snapshots])

	return {
		quotes,
		q_loading,
		q_error
	}
}

export default useQuoteList;
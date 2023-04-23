import { auth, db } from "..";
import { useList } from "react-firebase-hooks/database";
import { useMemo } from "react";
import { ref } from "firebase/database";

const useBookList = () => {
	const uid = auth.currentUser?.uid;

	const [snapshots, b_loading, b_error] = useList(ref(db, `data/users/${uid}/books`));

	const books = useMemo(() => {
		let arr = [];

		if (b_loading || b_error) return arr;

		for (let i of snapshots) {
			arr.push(i.val())
		}

		return arr;
	}, [b_error, b_loading, snapshots])

	return {
		books,
		b_loading,
		b_error
	}
}

export default useBookList;
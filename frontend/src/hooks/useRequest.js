import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/slice";
import { userSelector } from "../selectors/selectors";
import axios from 'axios';

const apiDomain = 'http://localhost:5032/api';

export const useRequest = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(userSelector);

    const getUser = useCallback(async (userId) => {
        const res = await axios.get(`${apiDomain}/Users/Get/${userId}`);

        if (res.data.id) {
            dispatch(setUser(res.data));
        }

        return res.data;
    }, [dispatch]);

    const getUserBooks = useCallback(async (userId) => {
        return (await axios.get(`${apiDomain}/Books/Get/${userId}`)).data;
    }, []);

    const addUserBook = useCallback(async (userId, book) => {
        return axios.post(`${apiDomain}/Books/Add`, {
            userId,
            book,
        }).then(async (res) => {
            console.log(res);

            const booksAfterUpdate = await getUserBooks(userId);

            dispatch(setUser({
                ...currentUser,
                books: booksAfterUpdate,
            }))

            return res;
        });

    }, [currentUser, dispatch, getUserBooks]);

    const getUserQuotes = useCallback(async (userId) => {
        return (await axios.get(`${apiDomain}/Quotes/Get/${userId}`)).data;
    }, []);

    const deleteUserBook = useCallback(async (userId, bookId, keepQuotes) => {
        await axios.post(`${apiDomain}/Books/Delete`, {
            userId,
            bookId,
        });

        let quotesAfterUpdate;

        if (!keepQuotes) {
            console.log(true);

            await axios.post(`${apiDomain}/Quotes/DeleteAssociated`, {
                userId,
                bookId,
            })

            quotesAfterUpdate = await getUserQuotes(userId);
        }

        const booksAfterUpdate = await getUserBooks(userId);

        dispatch(setUser({
            ...currentUser,
            books: booksAfterUpdate,
            quotes: quotesAfterUpdate || currentUser.quotes,
        }))
    }, [currentUser, dispatch, getUserBooks, getUserQuotes]);

    const deleteUserQuote = useCallback(async (userId, quoteId) => {
        return axios.post(`${apiDomain}/Quotes/Delete`, {
            userId,
            quoteId,
        }).then(async (res) => {
            const quotesAfterUpdate = await getUserQuotes(userId);

            dispatch(setUser({
                ...currentUser,
                quotes: quotesAfterUpdate,
            }))

            return res;
        }).catch(() => false);
    }, [currentUser, dispatch, getUserQuotes]);

    const addUserQuote = useCallback(async (userId, quote) => {
        return axios.post(`${apiDomain}/Quotes/Add`, {
            userId,
            quote,
        }).then(async () => {
            const quotesAfterUpdate = await getUserQuotes(userId);

            dispatch(setUser({
                ...currentUser,
                quotes: quotesAfterUpdate,
            }))

            return true;
        }).catch(() => false);
    }, [currentUser, dispatch, getUserQuotes]);

    const checkExistense = useCallback(async (email, password) => {
        return axios.post(`${apiDomain}/Users/CheckExistence`, {
            email,
            password,
        }).then(async res => {
            const user = await getUser(res.data.Message);

            return user;
        }).then((user) => user || undefined);
    }, [getUser]);

    const registerUser = useCallback(async (id, firstName, lastName, email, password) => {
        const response = await fetch(`${apiDomain}/Users/Register`, {
            method: 'post',
            body: JSON.stringify({
                id,
                firstName,
                lastName,
                email,
                password,
                books: [],
                quotes: [],
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log(response);

        setTimeout(() => getUser(id), 1000);
    }, [getUser]);

    return {
        getUser,
        getUserBooks,
        addUserBook,
        deleteUserBook,
        getUserQuotes,
        addUserQuote,
        checkExistense,
        registerUser,
        deleteUserQuote,
    };
};
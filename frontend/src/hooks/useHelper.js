import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setUser, initialState } from "../slices/slice";

export const useHelper = () => {
    const dispatch = useDispatch();

    const signOut = useCallback(() => {
        dispatch(setUser(initialState.user))
    }, [dispatch]);

    return { signOut };
};
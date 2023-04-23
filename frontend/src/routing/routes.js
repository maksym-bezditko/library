import * as ROUTES from "./paths";
import { Navigate } from "react-router-dom";
import Books from "../pages/Books/Books";
import SingleBook from "../pages/SingleBook/SingleBook";
import Quotes from "../pages/Quotes/Quotes";
import About from "../pages/About/About";


export const privateRoutes = [
	{
		path: ROUTES.HOME,
		component: <Navigate to="/books"/>
	},
	{
		path: ROUTES.BOOKS,
		component: <Books/>
	},
	{
		path: ROUTES.SINGLE_BOOK,
		component: <SingleBook/>
	},
	{
		path: ROUTES.QUOTES,
		component: <Quotes/>
	},
]

export const publicRoutes = [
	{
		path: ROUTES.HOME,
		component: <Navigate to="/about"/>
	},
	{
		path: ROUTES.ABOUT,
		component: <About/>
	},
]
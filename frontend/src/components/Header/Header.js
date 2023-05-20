import "./Header.scss";
import gistyLogo from "../../assets/Gisty.png";
import { NavLink } from 'react-router-dom';
import { useCallback, useEffect } from "react";
import { Fade as Hamburger} from "hamburger-react";
import AddModal from "../Popups/AddModal";
import LoginModal from "../Popups/LoginModal";
import RegisterModal from "../Popups/RegisterModal";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setMenu } from "../../slices/slice";
import { modalSelector } from "../../selectors/selectors";
import Menu from "../Menu/Menu";
import { useWindowSize } from "../../hooks/useWindowSize";
import { menuSelector } from "../../selectors/selectors";
import AddQuoteModal from '../Popups/AddQuoteModal';
import DeleteQuoteModal from "../Popups/DeleteQuoteModal";
import { useHelper } from "../../hooks/useHelper";

const Header = ({ isAuthenticated }) => {
	const dispatch = useDispatch()

	const modal = useSelector(modalSelector);
	const menu = useSelector(menuSelector);

	const { width } = useWindowSize();

	const checkKeypress = useCallback(event => {
		if (event.key === "Escape") {
			setMenu(false)
		}
	}, [])

	const { signOut } = useHelper();

	const ButtonGroup = useCallback(({ width }) => {
		if (!isAuthenticated) {
			return (
				<>
					<button className='button login-button'
					onClick={() => dispatch(setModal("login"))}>
						Log in
					</button>
						<button
						className="button register-button"
						onClick={() => dispatch(setModal("register"))}
					>
						Register
					</button>
				</>
			)

		} else if (isAuthenticated && width < 676) {
			return null
		} else if (isAuthenticated && width >= 676) {
			return (
				<>
					<button
						className={`button add-button${isAuthenticated ? "" : " hidden"}`}
						onClick={() => dispatch(setModal("add"))}
						>
						Add a book
					</button>
					<button className='button login-button' onClick={signOut}>
						Log out
					</button>
				</>
			)
		}
	}, [dispatch, isAuthenticated, signOut])

	useEffect(() => {
		document.addEventListener("keyup", checkKeypress)

		return () => {
			document.removeEventListener("keypress", checkKeypress)
		}
	})

	return (
    <>
      <LoginModal visible={modal === "login" ? true : false} />
      <RegisterModal visible={modal === "register" ? true : false} />
      {isAuthenticated && (
			<>
				<AddModal visible={modal === "add" ? true : false} />
				<AddQuoteModal visible={modal === "add-quote" ? true : false} />
				<DeleteQuoteModal visible={modal === "delete-quote" ? true : false} />
			</>
		)}

      <header>
        <div className="header-wrapper">
			<div className="logo-and-nav">
				<NavLink to={isAuthenticated ? "/books" : "about"} end>
					<img src={gistyLogo} alt="company logo" />
				</NavLink>

				<NavLink
					to="/books"
					style={({ isActive }) => ({
						color: isActive ? "#8950FC" : "#464E5F",
							display: width < 676 && isAuthenticated ? "" : "none"
					})}
					className={`nav-item first-button${isAuthenticated ? "" : " hidden"}`}
				>
					My books
				</NavLink>

				<NavLink
					to="/quotes"
					style={({ isActive }) => ({
						color: isActive ? "#8950FC" : "#464E5F",
							display: width < 676 && isAuthenticated ? "" : "none"
					})}
					className={`nav-item second-button${isAuthenticated ? "" : " hidden"}`}
				>
					My quotes
				</NavLink>
			</div>


          	<div className="button-group">
				  <ButtonGroup user={isAuthenticated} width={width}/>
			</div>

			<div className="hamburger" style={{display: width < 676 && isAuthenticated ? "" : "none"}}>
				<Hamburger size={27} distance="lg" toggled={menu} toggle={() => dispatch(setMenu(true))} color="#3F4254" />
			</div>

			<Menu/>
        </div>
      </header>
    </>
  );
}

export default Header;
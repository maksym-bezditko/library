import { useContext } from "react";
import { AuthContext } from "../App/App";
import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Menu.scss"
import { auth } from "../..";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { menuSelector } from "../../selectors/selectors";
import { setModal } from "../../slices/slice";
import { setMenu } from "../../slices/slice";

const Menu = () => {
	const user = useContext(AuthContext);

	const dispatch = useDispatch()
	const menu = useSelector(menuSelector);

	return (
		<div
            className="menu"
            style={{ display: menu ? "block" : "none" }}
            onClick={() => {
              dispatch(setMenu(false));
            }}
          >
            <CSSTransition in={menu} timeout={400} classNames="slide">
              <div
                className="menu-main"
                style={{ transform: "translateX(0)" }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p
                  className="menu-item margin"
                  onClick={() => dispatch(setModal("add"))}
                >
                  Add a book
                </p>

                <NavLink
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setMenu(false));
                  }}
                  to="/"
                  end
                  className="menu-item"
                  id="books"
                >
                  My books
                </NavLink>

                <NavLink
                  to="quotes"
                  end
                  id="quotes"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setMenu(false));
                  }}
                >
                  My quotes
                </NavLink>

                {!user ? null : (
                    <p
                        className="menu-item logout-menu"
                        onClick={() => {
                            if (window.confirm("Are you sure that you want to log out?")) {
                                signOut(auth);
                                dispatch(setMenu(false));
                            }
                            }}
                    >
                        Log out
                    </p>
                )}

                {auth.currentUser ? (
                    <p className="greeting" onClick={() => {
                        dispatch(setMenu(false));
                    }}>
                        Logged in as{" "}
                        <span className="name">{auth.currentUser.displayName}</span>
                    </p>
                ) : (
                    <p
                        className="menu-item"
                        onClick={() => dispatch(setModal("login"))}
                    >
                        Log in
                    </p>
                )}

                {user ? null : (
                    <p
                        className="menu-item"
                        onClick={() => dispatch(setModal("register"))}
                    >
                        Register
                    </p>
                )}
              </div>

            </CSSTransition>
          </div>
	)
}

export default Menu;
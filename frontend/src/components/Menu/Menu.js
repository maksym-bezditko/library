import { CSSTransition } from "react-transition-group";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Menu.scss"
import { useSelector } from "react-redux";
import { menuSelector, userSelector } from "../../selectors/selectors";
import { setModal, setMenu } from "../../slices/slice";
import { useHelper } from "../../hooks/useHelper";

const Menu = () => {
	const dispatch = useDispatch()

  const user = useSelector(userSelector);
	const menu = useSelector(menuSelector);

  const isAuthenticated = !!user.id;

  const { signOut } = useHelper();

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

                {!isAuthenticated ? null : (
                    <p
                      className="menu-item logout-menu"
                      onClick={() => {
                          if (window.confirm("Are you sure that you want to log out?")) {
                              signOut();
                              dispatch(setMenu(false));
                          }
                      }}
                    >
                        Log out
                    </p>
                )}

                {isAuthenticated ? (
                    <p className="greeting" onClick={() => {
                        dispatch(setMenu(false));
                    }}>
                        Logged in as{" "}
                        <span className="name">{user.firstName + ' ' + user.lastName}</span>
                    </p>
                ) : (
                    <p
                        className="menu-item"
                        onClick={() => dispatch(setModal("login"))}
                    >
                        Log in
                    </p>
                )}

                {isAuthenticated ? null : (
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
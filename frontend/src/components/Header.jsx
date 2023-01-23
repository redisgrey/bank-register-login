import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../features/auth/authSlice";

function Header() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const pathname = window.location.pathname;

    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    return (
        <header className="navbar container-fluid flex flex-row">
            <div className="logo navbar-brand">
                <Link to="/">OTRBN</Link>
            </div>
            <ul className="navbar-nav flex flex-row space-x-10">
                {(user && pathname === "/user") ||
                pathname === "/admin" ||
                pathname === "/update-account" ||
                pathname === "/update-status" ||
                pathname === "/success-update" ||
                pathname === "/update-profile" ||
                pathname === "/deposit" ||
                pathname === "/withdraw" ||
                pathname === "/transfer" ||
                pathname === "/balance" ||
                pathname === "/verify-deposit" ||
                pathname === "/verify-depcode" ||
                pathname === "/verify-withdraw" ||
                pathname === "/verify-wdrawcode" ||
                pathname === "/verify-transfer" ||
                pathname === "/verify-transcode" ? (
                    <>
                        <li className="nav-item">
                            <button className="btn" onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                Register
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/register-online">
                                Register to Online Banking
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;

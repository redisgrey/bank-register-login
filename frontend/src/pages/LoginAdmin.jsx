import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { FaSignInAlt } from "react-icons/fa";

import { loginAdmin, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function LoginAdmin() {
    const [loginForm, setLoginForm] = useState({
        emailAddress: "",
        password: "",
    });

    const { emailAddress, password } = loginForm;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            navigate("/admin");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setLoginForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            emailAddress,
            password,
        };

        dispatch(loginAdmin(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Admin Login
                </h1>
            </section>

            <section className="container">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="emailAddress" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailAddress"
                            name="emailAddress"
                            value={emailAddress}
                            placeholder="johndoe@gmail.com"
                            required
                            onChange={onChange}
                        />
                        <div id="emailAddressHelp" className="form-text">
                            Please enter a valid email address.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            required
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </section>
        </>
    );
}

export default LoginAdmin;

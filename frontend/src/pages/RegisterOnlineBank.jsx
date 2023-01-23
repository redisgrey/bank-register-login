import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { FaSignInAlt } from "react-icons/fa";

import { registerOnlineBanking, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function Login() {
    const [registerOnlineBank, setRegisterOnlineBank] = useState({
        emailAddress: "",
        password: "",
        accountNumber: "",
    });

    const { emailAddress, password, accountNumber } = registerOnlineBank;

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
            navigate("/success-register-online");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setRegisterOnlineBank((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            emailAddress,
            password,
            accountNumber,
        };

        dispatch(registerOnlineBanking(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Register to Online Banking
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
                        <div id="passwordHelp" className="form-text">
                            Please enter your registered password.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="accountNumber" className="form-label">
                            Account Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="accountNumber"
                            name="accountNumber"
                            value={accountNumber}
                            placeholder="Enter your account number"
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

export default Login;

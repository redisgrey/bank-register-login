import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { checkBalance, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function CheckBalance() {
    // const [accountBalanceCheck, setCheckBalance] = useState({
    //     accountNumber: "",
    // });

    // const { accountNumber } = accountBalanceCheck;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        // if (isSuccess) {
        //     navigate("/user");
        // }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    // const onChange = (e) => {
    //     setCheckBalance((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    // Get user from localStorage
    const balance = JSON.parse(localStorage.getItem("user"));

    const onSubmit = (e) => {
        e.preventDefault();

        // const userData = {
        //     accountNumber,
        // };

        dispatch(checkBalance());
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="container">
                <h1 className="display-4">
                    Your account balance is: {balance}
                </h1>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="showBalance" className="form-label">
                            Please click SHOW BALANCE BUTTON to view your
                            account balance.
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Show Balance
                    </button>
                </form>
            </section>
        </>
    );
}

export default CheckBalance;

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { transferMoney, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function TransferMoney() {
    const [transferMoneyFunc, setTransferMoney] = useState({
        emailAddress: "",
        amount: "",
    });

    const { emailAddress, amount } = transferMoneyFunc;

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
            navigate("/user");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setTransferMoney((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            emailAddress,
            amount,
        };

        dispatch(transferMoney(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="container">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="emailAddress" className="form-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailAddress"
                            name="emailAddress"
                            value={emailAddress}
                            placeholder="Enter the email address of the receiver"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">
                            Amount
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount"
                            name="amount"
                            value={amount}
                            placeholder="Enter the amount you want to deposit"
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

export default TransferMoney;

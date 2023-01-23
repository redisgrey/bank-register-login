import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { depositMoney, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function DepositMoney() {
    const [depositMoneyFunc, setDepositMoney] = useState({
        amount: "",
    });

    const { amount } = depositMoneyFunc;

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
        setDepositMoney((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            amount,
        };

        dispatch(depositMoney(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="container">
                <form onSubmit={onSubmit}>
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

export default DepositMoney;

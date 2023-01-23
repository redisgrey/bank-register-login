import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { updateAccount, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function AdminUpdateAccount() {
    const [adminUpdateAccount, setUpdateAccount] = useState({
        id: "",
        accountType: "",
        accountNumber: "",
    });

    const { id, accountType, accountNumber } = adminUpdateAccount;

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
            navigate("/success-update");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setUpdateAccount((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            id,
            accountType,
            accountNumber,
        };

        dispatch(updateAccount(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="container">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">
                            User's ID
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="id"
                            name="id"
                            value={id}
                            placeholder="Enter the user's id you want to update"
                            required
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="accountType" className="form-label">
                            Account Type
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="accountType"
                            name="accountType"
                            value={accountType}
                            placeholder="Enter the account type"
                            required
                            onChange={onChange}
                        />
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
                            placeholder="Enter the account number"
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

export default AdminUpdateAccount;

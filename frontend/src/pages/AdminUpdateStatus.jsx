import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { updateStatus, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function AdminUpdateStatus() {
    const [adminUpdateStatus, setUpdateStatus] = useState({
        emailAddress: "",
        status: "",
    });

    const { emailAddress, status } = adminUpdateStatus;

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
        setUpdateStatus((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            emailAddress,
            status,
        };

        dispatch(updateStatus(userData));
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
                            User's Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailAddress"
                            name="emailAddress"
                            value={emailAddress}
                            placeholder="Enter the user's email address you want to update"
                            required
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        {/* <div class="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="active"
                                id="active"
                                value={active}
                            />
                            <label class="form-check-label" for="activeStatus">
                                Active
                            </label>
                        </div>

                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                name="dormant"
                                id="dormant"
                                value={dormant}
                            />
                            <label
                                class="form-check-label"
                                for="dormantStatus"
                            >
                                Dormant
                            </label>
                        </div> */}
                        <input
                            type="text"
                            className="form-control"
                            id="status"
                            name="status"
                            value={status}
                            placeholder="Enter the account status"
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

export default AdminUpdateStatus;

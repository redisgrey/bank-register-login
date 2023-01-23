import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { FaUser } from "react-icons/fa";

import { verifyNumber, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function VerifyNumber() {
    const [otpVerification, setOtpVerification] = useState({
        mobileNumber: "",
    });

    const { mobileNumber } = otpVerification;

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
            navigate("/verify-code");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setOtpVerification((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            mobileNumber,
        };

        dispatch(verifyNumber(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Verify
                </h1>
            </section>

            <section className="container">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="verifyNumber" className="form-label">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="verifyNumber"
                            name="mobileNumber"
                            value={mobileNumber}
                            placeholder="+639123456789"
                            required
                            onChange={onChange}
                        />
                        <div id="mobileNumberHelp" className="form-text">
                            Please enter your registered number.
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </section>
        </>
    );
}

export default VerifyNumber;

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { FaUser } from "react-icons/fa";

import { verifyWdrawCode, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function VerifyWdrawCode() {
    const [otpVerification, setOtpVerification] = useState({
        otpNumber: "",
    });

    const { otpNumber } = otpVerification;

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
            navigate("/withdraw");
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
            otpNumber,
        };

        dispatch(verifyWdrawCode(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Verify Withdrawal OTP Code
                </h1>
            </section>

            <section className="container">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="otpNumber" className="form-label">
                            OTP Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="otpNumber"
                            name="otpNumber"
                            value={otpNumber}
                            required
                            onChange={onChange}
                        />
                        <div id="otpNumber" className="form-text">
                            Please enter the OTP code sent to your registered
                            mobile number.
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

export default VerifyWdrawCode;

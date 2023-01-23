import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { FaUser } from "react-icons/fa";

import { verifyWithdraw, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function VerifyWithdraw() {
    // const [otpVerification, setOtpVerification] = useState({
    //     mobileNumber: "",
    // });

    // const { mobileNumber } = otpVerification;

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
            navigate("/verify-wdrawcode");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    // const onChange = (e) => {
    //     setOtpVerification((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

    const onSubmit = (e) => {
        e.preventDefault();

        // const userData = {
        //     mobileNumber,
        // };

        dispatch(verifyWithdraw());
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Verify Withdrawal
                </h1>
            </section>

            <section className="container">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="verifyNumber" className="form-label">
                            Please click SEND button to send an otp number to
                            your registered mobile number
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Send OTP
                    </button>
                </form>
            </section>
        </>
    );
}

export default VerifyWithdraw;

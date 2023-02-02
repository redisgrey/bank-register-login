import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import {
    login,
    verifyNumber,
    verifyOtpNumber,
    reset,
} from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

import { Modal } from "../components/Modal";

function Welcome() {
    const [loginForm, setLoginForm] = useState({
        emailAddress: "",
        password: "",
    });

    const { emailAddress, password } = loginForm;

    const [open, setOpen] = useState(false);

    const [otpSent, setOtpSent] = useState(false);

    const [mobileNumber, setMobileNumber] = useState("");

    const [otpNumber, setOtpNumber] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(reset());
    }, [user, isError, message, navigate, dispatch]);

    const onChange = (e) => {
        setLoginForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const verifyNum = (e) => {
        e.preventDefault();

        setOtpSent(true);

        const userData = {
            mobileNumber,
        };

        dispatch(verifyNumber(userData));
    };

    const verifyOtp = async (e) => {
        e.preventDefault();

        const userData = {
            otpNumber,
        };

        await dispatch(verifyOtpNumber(userData));

        setOpen(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            emailAddress,
            password,
        };

        dispatch(login(userData));

        navigate("/user");
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="flex justify-center py-12 px-4 shadow-lg sm:px-6 md:min-h-[85vh] lg:px-8">
                <div className=" w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://i.ibb.co/3RmCsCR/Making-the-future-golden.png"
                            border="0"
                            alt="MyBank Logo"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6">
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label
                                    htmlFor="emailAddress"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="email"
                                    value={emailAddress}
                                    onChange={onChange}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={onChange}
                                    type="password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="">
                                <span className="ml-2 text-sm text-gray-900">
                                    Still not registered?
                                </span>
                                <a
                                    href="/register-online"
                                    className="text-sm font-medium ml-1 text-red-600 hover:text-red-800 no-underline"
                                >
                                    Sign Up
                                </a>
                            </div>

                            {/* <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </a>
                            </div> */}
                        </div>

                        <div>
                            <button
                                type="button"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={
                                    otpSent ? onSubmit : () => setOpen(true)
                                }
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                open={open}
                setOpen={setOpen}
                title={"Verify its you."}
                body={
                    <>
                        <div className="mt-2">
                            <label
                                htmlFor="mobileNumber"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Mobile Number:
                            </label>
                            <input
                                type="text"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) =>
                                    setMobileNumber(e.target.value)
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="+639xxxxxxxxx"
                            />
                        </div>

                        {otpSent && (
                            <div className="mt-2">
                                <label
                                    htmlFor="otpNumber"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    OTP:
                                </label>
                                <input
                                    type="text"
                                    id="otpNumber"
                                    value={otpNumber}
                                    onChange={(e) =>
                                        setOtpNumber(e.target.value)
                                    }
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="+639xxxxxxxxx"
                                />
                            </div>
                        )}
                    </>
                }
                footer={
                    <>
                        <button
                            type="button"
                            className="bg-black border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                            onClick={otpSent ? verifyOtp : verifyNum}
                        >
                            {otpSent ? "Submit" : "Send OTP"}
                        </button>
                    </>
                }
                errorMessage={errorMessage}
            />
        </>
    );
}

export default Welcome;

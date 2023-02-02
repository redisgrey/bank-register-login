import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { registerOnlineBanking, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function Login() {
    const [registerOnlineBank, setRegisterOnlineBank] = useState({
        fullName: "",
        emailAddress: "",
        password: "",
        accountNumber: "",
    });

    const { fullName, emailAddress, password, accountType, accountNumber } =
        registerOnlineBank;

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
            navigate("/verify-number");
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
            fullName,
            accountType,
            emailAddress,
            password,
            accountNumber,
        };

        // console.log(userData);
        dispatch(registerOnlineBanking(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="flex  justify-center shadow-lg py-12 px-4 sm:px-6 md:min-h-[85vh] lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://i.ibb.co/3RmCsCR/Making-the-future-golden.png"
                            border="0"
                            alt="MyBank Logo"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Register your Account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="fullName" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={fullName}
                                    onChange={onChange}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="flex flex-row justify-around my-3">
                                <div className="flex items-center">
                                    <input
                                        id="savingsAccount"
                                        name="accountType"
                                        type="radio"
                                        value={"Savings Account"}
                                        onChange={onChange}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor="savingsAccount"
                                        className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                        Savings Account
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="checkingAccount"
                                        name="accountType"
                                        type="radio"
                                        value={"Checking Account"}
                                        onChange={onChange}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor="checkingAccount"
                                        className="ml-3 block text-sm font-medium text-gray-700"
                                    >
                                        Checking Account
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="accountNumber"
                                    className="sr-only"
                                >
                                    Account Number
                                </label>
                                <input
                                    id="accountNumber"
                                    name="accountNumber"
                                    type="text"
                                    value={accountNumber}
                                    onChange={onChange}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Account Number"
                                />
                            </div>
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
                                    Already Registered?
                                </span>
                                <a
                                    href="/"
                                    className="text-sm font-medium ml-1 text-red-600 hover:text-red-800 no-underline"
                                >
                                    Sign In
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
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;

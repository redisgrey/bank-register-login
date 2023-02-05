import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { register, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function Register() {
    const [registrationForm, setRegistrationForm] = useState({
        fullName: "",
        dateOfBirth: "",
        mobileNumber: "",
        emailAddress: "",
        //password: "",
        homeAddress: "",
        gender: "",
        civilStatus: "",
        citizenship: "",
        sourceOfFunds: "",
        grossMonthlyIncome: "",
    });

    const {
        fullName,
        dateOfBirth,
        mobileNumber,
        emailAddress,
        //password,
        homeAddress,
        gender,
        civilStatus,
        citizenship,
        sourceOfFunds,
        grossMonthlyIncome,
    } = registrationForm;

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
            navigate("/initial-verify-number");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setRegistrationForm((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            fullName,
            dateOfBirth,
            mobileNumber,
            emailAddress,
            //password,
            homeAddress,
            gender,
            civilStatus,
            citizenship,
            sourceOfFunds,
            grossMonthlyIncome,
        };

        //console.log(userData);
        dispatch(register(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className=" ">
                <div className="md:grid md:gap-6">
                    <div className=" md:col-span-2 ">
                        <form onSubmit={onSubmit}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="mt-5">
                                    <img
                                        className="mx-auto h-12 w-auto"
                                        src="https://i.ibb.co/3RmCsCR/Making-the-future-golden.png"
                                        border="0"
                                        alt="MyBank Logo"
                                    />
                                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                        Create your Account
                                    </h2>
                                </div>
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="fullName"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                id="fullName"
                                                value={fullName}
                                                onChange={onChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Jane M. Doe"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="dateOfBirth"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Date of Birth
                                            </label>
                                            <input
                                                type="text"
                                                name="dateOfBirth"
                                                id="dateOfBirth"
                                                value={dateOfBirth}
                                                onChange={onChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="MM/DD/YYYY"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="emailAddress"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="emailAddress"
                                                id="emailAddress"
                                                value={emailAddress}
                                                onChange={onChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="janedoe@example.com"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="mobileNumber"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Mobile Number
                                            </label>
                                            <input
                                                type="text"
                                                name="mobileNumber"
                                                id="mobileNumber"
                                                value={mobileNumber}
                                                onChange={onChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Please follow this format: +639xxxxxxxxx"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label
                                                htmlFor="homeAddress"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Home Address
                                            </label>
                                            <input
                                                type="text"
                                                name="homeAddress"
                                                id="homeAddress"
                                                value={homeAddress}
                                                onChange={onChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Brgy, City, Province, Zip Code"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label
                                                htmlFor="gender"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Gender
                                            </label>
                                            <div className="flex flex-row space-x-10 my-3">
                                                <div className="flex items-center">
                                                    <input
                                                        id="male"
                                                        name="gender"
                                                        type="radio"
                                                        value={"Male"}
                                                        onChange={onChange}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor="male"
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        Male
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input
                                                        id="female"
                                                        name="gender"
                                                        type="radio"
                                                        value={"Female"}
                                                        onChange={onChange}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label
                                                        htmlFor="female"
                                                        className="ml-3 block text-sm font-medium text-gray-700"
                                                    >
                                                        Female
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                htmlFor="civilStatus"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Civil Status
                                            </label>
                                            <select
                                                id="civilStatus"
                                                name="civilStatus"
                                                value={civilStatus}
                                                onChange={onChange}
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option>
                                                    Select Civil Status
                                                </option>
                                                <option>Single</option>
                                                <option>Married</option>
                                                <option>Divorced</option>
                                                <option>Widowed</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                htmlFor="citizenship"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Citizenship
                                            </label>
                                            <input
                                                type="text"
                                                name="citizenship"
                                                id="citizenship"
                                                value={citizenship}
                                                onChange={onChange}
                                                required
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Filipino"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                htmlFor="sourceOfFunds"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Source of Funds
                                            </label>
                                            <select
                                                id="sourceOfFunds"
                                                name="sourceOfFunds"
                                                value={sourceOfFunds}
                                                onChange={onChange}
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option>
                                                    Select Source of Funds
                                                </option>
                                                <option>Employment</option>
                                                <option>Self-Employed</option>
                                                <option>Remittances</option>
                                                <option>Allowance</option>
                                                <option>Others</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                htmlFor="grossMonthlyIncome"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Gross Monthly Income (PHP)
                                            </label>
                                            <select
                                                id="grossMonthlyIncome"
                                                name="grossMonthlyIncome"
                                                value={grossMonthlyIncome}
                                                onChange={onChange}
                                                required
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option>
                                                    Select your Gross Monthly
                                                    Income Range
                                                </option>
                                                <option>Below 10000</option>
                                                <option>10000 - 30000</option>
                                                <option>30000-50000</option>
                                                <option>Above 50000</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;

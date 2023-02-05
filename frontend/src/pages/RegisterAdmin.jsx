import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import {
    registerAdmin,
    verifySuperAdmin,
    reset,
} from "../features/auth/adminSlice";

import Spinner from "../components/Spinner";

import { Modal } from "../components/Modal";

function RegisterAdmin() {
    const [registrationAdmin, setRegistrationAdmin] = useState({
        fullName: "",
        emailAddress: "",
        password: "",
        mobileNumber: "",
    });

    const { fullName, emailAddress, password, mobileNumber } =
        registrationAdmin;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { admin, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.admin
    );

    const [open, setOpen] = useState(false);

    const [superAdminPassword, setSuperAdminPassword] = useState("");

    const [superAdminVerified, setSuperAdminVerified] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(reset());
    }, [admin, isError, message, navigate, dispatch]);

    const onChange = (e) => {
        setRegistrationAdmin((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const superAdminVerification = async (e) => {
        e.preventDefault();

        const userData = {
            superAdminPassword,
        };

        await dispatch(verifySuperAdmin(userData));

        setOpen(false);

        setSuperAdminVerified(true);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            fullName,
            emailAddress,
            password,
            mobileNumber,
        };

        // console.log(userData);
        dispatch(registerAdmin(userData));

        navigate("/success-register-online");
        //to change to success-admin-register
        // add verification alert then click sign in bla bla
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
                            Admin Registration
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6">
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

                            <div>
                                <label
                                    htmlFor="mobileNumber"
                                    className="sr-only"
                                >
                                    Mobile Number
                                </label>
                                <input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    type="text"
                                    value={mobileNumber}
                                    onChange={onChange}
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Mobile Number"
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

                        <div>
                            <button
                                type="button"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={
                                    superAdminVerified
                                        ? onSubmit
                                        : () => setOpen(true)
                                }
                            >
                                Register Admin
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                open={open}
                setOpen={setOpen}
                title={"Super Admin Access Code"}
                body={
                    <>
                        <div className="mt-2">
                            <label
                                htmlFor="superAdminPassword"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Super Admin Password:
                            </label>
                            <input
                                type="password"
                                id="superAdminPassword"
                                value={superAdminPassword}
                                onChange={(e) =>
                                    setSuperAdminPassword(e.target.value)
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Super Admin Password"
                            />
                        </div>
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
                            onClick={superAdminVerification}
                        >
                            Verify
                        </button>
                    </>
                }
                errorMessage={errorMessage}
            />
        </>
    );
}

export default RegisterAdmin;

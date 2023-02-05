import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Modal } from "../components/Modal";

import { SelectAccount } from "../components/SelectAccount";

import { toast } from "react-toastify";

import {
    depositMoney,
    checkBalance,
    transferMoney,
    reset,
} from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function UserDashboard() {
    const [userData, setUserData] = useState([]);

    const [balance, setBalance] = useState(0);

    const [open, setOpen] = useState(false);

    const [isTransferring, setIsTransferring] = useState(false);

    const [destinationAccount, setDestinationAccount] = useState({});

    const [amount, setAmount] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch();

    const { isLoading, isError, message } = useSelector((state) => state.auth);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData) {
            setUserData(userData);
        }
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(checkBalance()).then((response) => {
            //console.log(response.payload.accountBalance);
            setBalance(response.payload.accountBalance);
        });

        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    const deposit = () => {
        const userData = {
            amount,
        };

        if (amount >= 100) {
            dispatch(depositMoney(userData));

            toast.success("Deposit Successful");

            setOpen(false);
        } else {
            toast.error("Minimum amount is PHP 100");

            setOpen(false);
        }
    };

    // const getAccounts = () => {
    //     const userData = {
    //         amount,
    //     };

    //     if (amount >= 100) {
    //         dispatch(depositMoney(userData));

    //         toast.success("Deposit Successful");

    //         setOpen(false);
    //     } else {
    //         toast.error("Minimum amount is PHP 100");

    //         setOpen(false);
    //     }
    // };

    const transfer = () => {
        const userData = {
            amount,
        };

        //console.log(userData);

        dispatch(transferMoney(userData));

        toast.success("Transfer Successful");

        setOpen(false);
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <section className="container shadow-lg">
                <div className="flex mx-auto md:w-[50%] ">
                    <form className="flex-auto p-6">
                        <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
                            {userData.accountType}
                        </div>

                        <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2">
                            Account Number:
                        </div>

                        <div className="flex flex-wrap">
                            <h1 className="flex-auto text-xl  text-slate-900">
                                {userData.accountNumber}
                            </h1>
                            <div className="text-xl  text-black-500">
                                PHP {balance}
                            </div>
                        </div>

                        <div className="flex flex-row mt-2">
                            <div className="px-2 py-3 text-right">
                                <button
                                    type="button"
                                    className="bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                                    onClick={() => {
                                        setIsTransferring(false);
                                        setOpen(true);
                                    }}
                                >
                                    Deposit
                                </button>
                            </div>

                            <div className="px-2 py-3 text-right">
                                <button
                                    type="button"
                                    className="bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                                    onClick={() => {
                                        setIsTransferring(true);
                                        setOpen(true);
                                        //getAccounts;
                                    }}
                                >
                                    Transfer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <Modal
                open={open}
                setOpen={setOpen}
                title={
                    isTransferring
                        ? "Transfer money to other account"
                        : "Add money to your account"
                }
                body={
                    <>
                        {isTransferring && (
                            <div className="mt-2">
                                <SelectAccount
                                    title="Destination Account"
                                    //accounts={accounts}
                                    account={destinationAccount}
                                    setAccount={setDestinationAccount}
                                />
                            </div>
                        )}

                        <div className="mt-2">
                            <label
                                htmlFor="amount"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Amount
                            </label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="0.00"
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
                            onClick={isTransferring ? transfer : deposit}
                        >
                            {isTransferring ? "Transfer" : "Add"}
                        </button>
                    </>
                }
                errorMessage={errorMessage}
            />
        </>
    );
}

export default UserDashboard;

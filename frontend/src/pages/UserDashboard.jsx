import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Modal } from "../components/Modal";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { depositMoney, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function UserDashboard() {
    const [userData, setUserData] = useState([]);
    const [open, setOpen] = useState(false);
    const [isTransferring, setIsTransferring] = useState(false);
    const [amount, setAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    // const { user, isLoading, isError, isSuccess, message } = useSelector(
    //     (state) => state.auth
    // );

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        // if (isError) {
        //     toast.error(message);
        // }

        // if (isSuccess) {
        //     navigate("/user");
        // }

        // dispatch(reset());
        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData) {
            setUserData(userData);
        }

        // console.log(userData);
    }, []);

    const deposit = () => {
        // const userInfo = JSON.parse(localStorage.getItem("user"));

        const userData = {
            // id: userInfo.id,
            amount,
        };

        // localStorage.setItem("userData", JSON.stringify(userData));

        // navigate();
        console.log(userData);
        dispatch(depositMoney(userData));
    };
    return (
        <>
            <section className="container shadow-lg">
                <div className="flex  mt-5 mx-auto md:w-[50%] ">
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
                                PHP {userData.accountBalance}
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
                                >
                                    Withdraw
                                </button>
                            </div>

                            <div className="px-2 py-3 text-right">
                                <button
                                    type="button"
                                    className="bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                                    onClick={() => {
                                        setIsTransferring(true);
                                        setOpen(true);
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
                        ? "Transfer money to other wallet"
                        : "Add money to your wallet"
                }
                body={
                    <>
                        {isTransferring && (
                            <div className="mt-2">
                                {/* <SelectContact
                                    title="Destination contact"
                                    contacts={contacts}
                                    contact={destinationWallet}
                                    setContact={setDestinationWallet}
                                /> */}
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
                                min={0}
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
                            onClick={() => dispatch(depositMoney(amount))}
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

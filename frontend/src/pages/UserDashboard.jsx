import { useEffect, useState } from "react";

function UserDashboard() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));

        if (userData) {
            setUserData(userData);
        }

        // console.log(userData);
    }, []);

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
                                >
                                    Transfer
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default UserDashboard;

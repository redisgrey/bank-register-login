import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

// Pages
import Welcome from "./pages/Welcome";

import UserDashboard from "./pages/UserDashboard";

import AdminDashboard from "./pages/AdminDashboard";

import Login from "./pages/Login";

import LoginAdmin from "./pages/LoginAdmin";

// import Register from "./pages/Register";

import VerifyNumber from "./pages/VerifyNumber";

import VerifyCode from "./pages/VerifyCode";

import SuccessRegisterMess from "./pages/SuccessRegisterMess";

import SuccessRegOlBankMess from "./pages/SuccessRegOlBankMess";

import AdminUpdateStatus from "./pages/AdminUpdateStatus";

import AdminUpdateAccount from "./pages/AdminUpdateAccount";

import RegisterOnlineBank from "./pages/RegisterOnlineBank";

import SuccessUpdateMess from "./pages/SuccessUpdateMess";

import UserUpdateProfile from "./pages/UserUpdateProfile";

import DepositMoney from "./pages/DepositMoney";

import WithdrawMoney from "./pages/WithdrawMoney";

import TransferMoney from "./pages/TransferMoney";

import CheckBalance from "./pages/CheckBalance";

import VerifyDeposit from "./pages/VerifyDeposit";

import VerifyDepCode from "./pages/VerifyDepCode";

import VerifyWithdraw from "./pages/VerifyWithdraw";

import VerifyWdrawCode from "./pages/VerifyWdrawCode";

import VerifyTransfer from "./pages/VerifyTransfer";

import VerifyTransCode from "./pages/VerifyTransCode";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Welcome />} />

                        <Route path="/admin" element={<AdminDashboard />} />

                        <Route path="/user" element={<UserDashboard />} />

                        <Route path="/login" element={<Login />} />

                        <Route path="/login-admin" element={<LoginAdmin />} />

                        {/* <Route path="/register" element={<Register />} /> */}

                        <Route
                            path="/register-online"
                            element={<RegisterOnlineBank />}
                        />

                        <Route
                            path="/verify-number"
                            element={<VerifyNumber />}
                        />

                        <Route path="/verify-code" element={<VerifyCode />} />

                        <Route path="/deposit" element={<DepositMoney />} />

                        <Route
                            path="/verify-deposit"
                            element={<VerifyDeposit />}
                        />

                        <Route
                            path="/verify-depcode"
                            element={<VerifyDepCode />}
                        />

                        <Route path="/withdraw" element={<WithdrawMoney />} />

                        <Route
                            path="/verify-withdraw"
                            element={<VerifyWithdraw />}
                        />

                        <Route
                            path="/verify-wdrawcode"
                            element={<VerifyWdrawCode />}
                        />

                        <Route path="/transfer" element={<TransferMoney />} />

                        <Route
                            path="/verify-transfer"
                            element={<VerifyTransfer />}
                        />

                        <Route
                            path="/verify-transcode"
                            element={<VerifyTransCode />}
                        />

                        <Route path="/balance" element={<CheckBalance />} />

                        <Route
                            path="/success-register"
                            element={<SuccessRegisterMess />}
                        />

                        <Route
                            path="/success-register-online"
                            element={<SuccessRegOlBankMess />}
                        />

                        <Route
                            path="/success-update"
                            element={<SuccessUpdateMess />}
                        />

                        <Route
                            path="/update-status"
                            element={<AdminUpdateStatus />}
                        />

                        <Route
                            path="/update-profile"
                            element={<UserUpdateProfile />}
                        />

                        <Route
                            path="/update-account"
                            element={<AdminUpdateAccount />}
                        />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { updateProfile, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function UserUpdateProfile() {
    const [userUpdateProfile, setUserUpdateProfile] = useState({
        emailAddress: "",
        fullName: "",
        dateOfBirth: "",
        mobileNumber: "",
        newPassword: "",
        homeAddress: "",
        civilStatus: "",
        citizenship: "",
        sourceOfFunds: "",
        grossMonthlyIncome: "",
    });

    const {
        emailAddress,
        fullName,
        dateOfBirth,
        mobileNumber,
        newPassword,
        homeAddress,
        civilStatus,
        citizenship,
        sourceOfFunds,
        grossMonthlyIncome,
    } = userUpdateProfile;

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
            navigate("/success-update");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setUserUpdateProfile((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            emailAddress,
            fullName,
            dateOfBirth,
            mobileNumber,
            newPassword,
            homeAddress,
            civilStatus,
            citizenship,
            sourceOfFunds,
            grossMonthlyIncome,
        };

        dispatch(updateProfile(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="container">
                <h2>First, Please enter your registered email address</h2>
                <div className="mb-3">
                    <label htmlFor="emailAddress" className="form-label">
                        Email Address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailAddress"
                        name="emailAddress"
                        value={emailAddress}
                        placeholder="janedoe@gmail.com"
                        onChange={onChange}
                    />
                </div>
                <h2>Second, Please fill out any fields you want to update.</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            name="fullName"
                            value={fullName}
                            placeholder="Jane Doe"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dateOfBirth" className="form-label">
                            Date of Birth
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={dateOfBirth}
                            placeholder="mm-dd-yyyy"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mobileNumber" className="form-label">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={mobileNumber}
                            placeholder="+639123456789"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                            New Password
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="newPassword"
                            name="newPassword"
                            value={newPassword}
                            placeholder="Enter your new password"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="homeAddress" className="form-label">
                            Home Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="homeAddress"
                            name="homeAddress"
                            value={homeAddress}
                            placeholder="Brgy, City, Province, Zip Code"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="civilStatus" className="form-label">
                            Civil Status
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="civilStatus"
                            name="civilStatus"
                            value={civilStatus}
                            placeholder="Married"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="citizenship" className="form-label">
                            Citizenship
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="citizenship"
                            name="citizenship"
                            value={citizenship}
                            placeholder="Filipino"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="sourceOfFunds" className="form-label">
                            Source of Funds
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="sourceOfFunds"
                            name="sourceOfFunds"
                            value={sourceOfFunds}
                            placeholder="Remittance"
                            onChange={onChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="grossMonthlyIncome"
                            className="form-label"
                        >
                            Gross Monthly Income
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="grossMonthlyIncome"
                            name="grossMonthlyIncome"
                            value={grossMonthlyIncome}
                            placeholder="50000"
                            onChange={onChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </section>
        </>
    );
}
export default UserUpdateProfile;

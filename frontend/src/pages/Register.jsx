import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { FaUser } from "react-icons/fa";

import { register, reset } from "../features/auth/authSlice";

import Spinner from "../components/Spinner";

function Register() {
    const [registrationForm, setRegistrationForm] = useState({
        fullName: "",
        dateOfBirth: "",
        mobileNumber: "",
        emailAddress: "",
        password: "",
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
        password,
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
            navigate("/verify-number");
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
            password,
            homeAddress,
            gender,
            civilStatus,
            citizenship,
            sourceOfFunds,
            grossMonthlyIncome,
        };

        dispatch(register(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
            </section>

            <section className="container">
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
                            placeholder="John A. Doe"
                            required
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
                            required
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
                            required
                            onChange={onChange}
                        />
                        <div id="mobileNumberHelp" className="form-text">
                            Please follow the +639xxxxxxxxx format.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="emailAddress" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailAddress"
                            name="emailAddress"
                            value={emailAddress}
                            placeholder="johndoe@gmail.com"
                            required
                            onChange={onChange}
                        />
                        <div id="emailAddressHelp" className="form-text">
                            Please enter a valid email address.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            required
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
                            placeholder="Brgy. Masipag, Matalino City, Malupet Province, 5203"
                            required
                            onChange={onChange}
                        />
                        <div id="homeAddressHelp" className="form-text">
                            Please enter your complete home address.
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">
                            Gender
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={gender}
                            placeholder="Male"
                            required
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
                            placeholder="Divorced"
                            required
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
                            required
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
                            placeholder="Employment"
                            required
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
                            placeholder="15000"
                            required
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

export default Register;

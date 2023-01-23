import { Link } from "react-router-dom";

function UserDashboard() {
    return (
        <>
            <section className="container">
                <h1 className="display-3 text-center mb-2">Welcome User!</h1>

                <h2 className="text-center">What do you want to do today?</h2>
                <div className="list-group text-center">
                    <Link
                        to="/balance"
                        className="list-group-item list-group-item-action"
                    >
                        Check Balance
                    </Link>

                    <Link
                        to="/verify-deposit"
                        className="list-group-item list-group-item-action"
                    >
                        Deposit Money
                    </Link>

                    <Link
                        to="/verify-withdraw"
                        className="list-group-item list-group-item-action"
                    >
                        Withdraw Money
                    </Link>

                    <Link
                        to="/verify-transfer"
                        className="list-group-item list-group-item-action"
                    >
                        Transfer Money
                    </Link>

                    <Link
                        to="/update-profile"
                        className="list-group-item list-group-item-action"
                    >
                        Update your profile
                    </Link>
                </div>
            </section>
        </>
    );
}

export default UserDashboard;

import { Link } from "react-router-dom";

function AdminDashboard() {
    return (
        <>
            <section className="container">
                <h1 className="display-5 text-center">Welcome Admin!</h1>

                <h2 className="text-center">What do you want to do today?</h2>
                <div className="list-group text-center">
                    <Link
                        to="/update-status"
                        className="list-group-item list-group-item-action"
                    >
                        Update Users' status
                    </Link>
                    <Link
                        to="/update-account"
                        className="list-group-item list-group-item-action"
                    >
                        Update Users' account
                    </Link>
                </div>
            </section>
        </>
    );
}

export default AdminDashboard;

// this is the success message after registration
function SuccessRegisterMess() {
    return (
        <>
            <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-center text-2xl mb-4">
                    You have successfully registered! Please login to your
                    account to access your dashboard. Thank you!
                </h1>

                <div>
                    <a
                        href="/"
                        className=" text-red-600 text-xl hover:text-red-800"
                    >
                        Go to Login Page
                    </a>
                </div>
            </div>
        </>
    );
}

export default SuccessRegisterMess;

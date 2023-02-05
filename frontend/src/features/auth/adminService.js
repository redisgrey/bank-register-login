import axios from "axios";

// Register Admin
const registerAdmin = async (userData) => {
    const response = await axios.post("/api/admin/register/admin", userData);

    if (response.data) {
        localStorage.setItem("admin", JSON.stringify(response.data));
    }

    return response.data;
};

// Verify Super Admin
const verifySuperAdmin = async (userData) => {
    const response = await axios.post(
        "/api/admin/super-admin-verify",
        userData
    );

    if (response.data) {
        localStorage.setItem("admin", JSON.stringify(response.data));
    }

    return response.data;
};

const adminService = {
    registerAdmin,
    verifySuperAdmin,
};

export default adminService;

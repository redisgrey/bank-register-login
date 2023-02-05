const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
    registerAdmin,
    verifySuperAdmin,
} = require("../controllers/adminController");

//*ROUTES
router.post("/register/admin", registerAdmin);

router.post("/super-admin-verify", verifySuperAdmin);

module.exports = router;

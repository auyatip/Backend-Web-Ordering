const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/verifyToken");

//router Object
const router = express.Router();

// GET ALL USERS || GET
// router.get("/all-users", getAllUsers);

// CREATE USER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

module.exports = router;

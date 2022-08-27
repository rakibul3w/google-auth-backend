const express = require("express");
const { userGoogleAuth, userLogin } = require("../controllers/userController");


const router = express.Router();

// router.post("/login", userLogin);
router.post("/google-auth", userGoogleAuth);

module.exports = router;
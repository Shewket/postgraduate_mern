const express = require('express');
const {registerUser, loginUser, getProfile, logoutUser} =  require('../controllers/user.controller');
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(getProfile);
router.route("/logout").post(logoutUser);

module.exports = router;


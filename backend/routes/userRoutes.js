const express = require("express");
const { getUserBookings } = require("../controllers/userController");
const router = express.Router();

router.get("/:userId/bookings", getUserBookings);

module.exports = router;

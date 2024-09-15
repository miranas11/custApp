const User = require("../models/User");

const getUserBookings = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate(
            "bookingHistory.serviceId"
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ bookings: user.bookingHistory });
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
};

module.exports = { getUserBookings };

const Booking = require("../models/Booking");
const Service = require("../models/Service");
const User = require("../models/User");

const bookService = async (req, res) => {
    const { userId, serviceId, bookingDate } = req.body;

    try {
        // Find the user and service
        const user = await User.findById(userId);
        const service = await Service.findById(serviceId);

        if (!user || !service) {
            return res
                .status(404)
                .json({ message: "User or Service not found" });
        }

        // Check if the date is already booked (unavailable)
        const unavailableDate = service.unavailabilityCalendar.find(
            (date) =>
                date.date.toISOString() === new Date(bookingDate).toISOString()
        );

        if (unavailableDate) {
            return res
                .status(400)
                .json({ message: "This date is already booked" });
        }

        // Add the date to the unavailability calendar
        service.unavailabilityCalendar.push({ date: new Date(bookingDate) });

        // Add the booking to the user's history
        user.bookingHistory.push({
            serviceId: service._id,
            bookingDate: new Date(bookingDate),
        });

        // Create a new booking record
        const newBooking = new Booking({
            userId: user._id,
            serviceId: service._id,
            bookingDate: new Date(bookingDate),
        });

        // Save the updated user, service, and booking
        await user.save();
        await service.save();
        await newBooking.save();

        res.status(200).json({
            message: "Booking successful",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Error booking service:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { bookService };

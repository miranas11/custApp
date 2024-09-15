const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    },
    bookingDate: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

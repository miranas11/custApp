const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    bookingHistory: [
        {
            serviceId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service",
            },
            bookingDate: Date,
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

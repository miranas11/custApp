const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const locationSchema = new mongoose.Schema({
    city: String,
    coordinates: {
        latitude: Number,
        longitude: Number,
    },
});

const availabilitySchema = new mongoose.Schema({
    date: { type: Date, required: true },
    available: { type: Boolean, default: true },
});

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: locationSchema,
    serviceType: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    images: [{ type: String }],
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    unavailabilityCalendar: [
        {
            date: Date,
        },
    ],
    reviews: [reviewSchema],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", serviceSchema);

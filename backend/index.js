const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoute = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/payementRoutes");

dotenv.config();

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

const PORT = process.env.PORT || 5000;
try {
    mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;
} catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
}

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

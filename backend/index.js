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

const allowedOrigins = [
    "http://localhost:3000",
    "https://cust-app-six.vercel.app",
    "https://cust-app-git-hosted-miranas11s-projects.vercel.app/",
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

const env = "PROD";

const mongourl =
    "mongodb+srv://miranas:abc@custcluster.xctwo.mongodb.net/?retryWrites=true&w=majority&appName=custCluster";

const MONGO_URI = "mongodb://localhost:27017/custApp";

mongoose
    .connect(mongourl)
    .then(() => {
        console.log("Connection Open ATLAS");
    })
    .catch((e) => {
        console.log("ERROR");
    });

const PORT = process.env.port || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoute);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import React, { useEffect, useState } from "react";
import apiController from "../controllers/apiController";
import "../styles/MyBookings.css";
import { jwtDecode } from "jwt-decode";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = jwtDecode(token).userId;
                const response = await apiController.getUserBookings(userId);
                setBookings(response.bookings);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, []);

    if (loading) return <p>Loading your bookings...</p>;

    if (bookings.length === 0) return <p>No bookings available.</p>;

    return (
        <div className="my-bookings-container">
            <h1>My Bookings</h1>
            {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                    <h2>{booking.serviceId.title}</h2>
                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Status:</strong> {booking.status}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default MyBookings;

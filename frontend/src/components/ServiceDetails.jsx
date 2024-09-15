import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/ServiceDetails.css";
import apiController from "../controllers/apiController";
import { jwtDecode } from "jwt-decode";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [unavailableDates, setUnavailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // To store the selected date
    const [loading, setLoading] = useState(false); // For button loading state

    // Render star ratings for reviews
    const renderStarRating = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const totalStars = 5;

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <FaStar key={index} className="star full-star" />
                ))}
                {halfStar && <FaStarHalfAlt className="star half-star" />}
                {[...Array(totalStars - fullStars - (halfStar ? 1 : 0))].map(
                    (_, index) => (
                        <FaRegStar key={index} className="star empty-star" />
                    )
                )}
            </>
        );
    };

    useEffect(() => {
        const fetchService = async () => {
            try {
                const data = await apiController.getServiceDetails(id);
                setService(data);

                // Extract unavailable dates from unavailabilityCalendar
                const unavailable = data.unavailabilityCalendar.map(
                    (item) => new Date(item.date)
                );
                setUnavailableDates(unavailable);
            } catch (error) {
                console.error("Error fetching service details:", error);
            }
        };
        fetchService();
    }, [id]);

    const handleDateChange = (date) => {
        setSelectedDate(date); // Set the selected date when the user picks a date
    };

    const handleBookService = async () => {
        if (!selectedDate) {
            alert("Please select a date.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const { userId, email } = jwtDecode(token);

            setLoading(false);
            navigate(`/payment/${userId}/${service._id}`, {
                state: {
                    amount: service.price,
                    date: selectedDate,
                    email: email,
                },
            });
        } catch (error) {
            setLoading(false);
            console.error("Error booking service:", error);
            alert("Failed to book the service. Please try again.");
        }
    };

    if (!service) return <div>Loading...</div>;

    return (
        <div className="service-details-container">
            {/* Title */}
            <h1 className="service-details-title">{service.title}</h1>

            {/* Image */}
            <img
                src={service.images[0]}
                alt={service.title}
                className="service-details-image"
            />

            {/* Description */}
            <p className="service-description">{service.description}</p>

            {/* Location and Price */}
            <div className="service-info">
                <p className="service-info-item">
                    <strong>Location:</strong> {service.location.city}
                </p>
                <p className="service-info-item">
                    <strong>Price:</strong> ${service.price}
                </p>
            </div>

            {/* Calendar for Unavailable Dates */}
            <div className="service-calendar-container">
                <h2 className="service-calendar-title">Available Dates</h2>
                <Calendar
                    onChange={handleDateChange} // Handle date change
                    tileDisabled={({ date, view }) =>
                        view === "month" &&
                        (date < new Date() || // Disable past dates
                            unavailableDates.some((d) => {
                                return (
                                    date.toString().slice(0, 15) ===
                                    d.toString().slice(0, 15)
                                );
                            }))
                    }
                />
            </div>

            <div className="book-service-container">
                <button
                    onClick={handleBookService}
                    className="book-service-button"
                    disabled={loading}
                >
                    {loading ? "Booking..." : "Book Service"}
                </button>
            </div>

            <div className="service-reviews">
                <h2 className="service-reviews-title">Reviews</h2>
                {service.reviews && service.reviews.length > 0 ? (
                    service.reviews.map((review, index) => (
                        <div key={index} className="review-container">
                            <div className="review-header">
                                <p className="review-user">{review.user}</p>
                                <div className="review-rating">
                                    {renderStarRating(review.rating)}
                                </div>
                            </div>
                            <p className="review-comment">{review.comment}</p>
                            <p className="review-date">
                                {new Date(review.date).toLocaleDateString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
        </div>
    );
};

export default ServiceDetails;

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import apiController from "../controllers/apiController";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/StripePayement.css";

const stripePromise = loadStripe(
    "pk_test_51PzCAe07qYo8tts46JfkdRXkmVusR59AdehYmQdb5nQoM77zeDTjaM4yJXn06KR8ludORxWaOVTL8td0HcW02hTW00le8mfJ7b"
);

const CheckoutForm = ({ userId, serviceId }) => {
    const location = useLocation();
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { amount, date, email } = location.state || {};

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { clientSecret } = await apiController.createPaymentIntent({
                amount,
                email,
            });

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setErrorMessage(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    // const paymentIntentId = result.paymentIntent.id;
                    // const paymentIntent = await apiController.getPaymentIntent(
                    //     paymentIntentId
                    // );

                    // console.log(paymentIntent);
                    // const receiptUrl =
                    //     paymentIntent.charges.data[0].receipt_url;

                    // console.log(receiptUrl);

                    // const receiptUrl =
                    //     result.paymentIntent.charges.data[0].receipt_url;

                    // alert(
                    //     "Payment successful! View your receipt here: " +
                    //         receiptUrl
                    // );
                    const response = await apiController.bookService({
                        userId,
                        serviceId: serviceId,
                        bookingDate: date,
                    });

                    alert("Booking Succesfull");

                    navigate("/my-bookings");
                }
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="stripe-payment-container">
            <form onSubmit={handleSubmit} className="payment-form">
                <h2>Payment Form</h2>
                <CardElement className="StripeElement" />
                <button
                    type="submit"
                    className="payment-button"
                    disabled={!stripe || loading}
                >
                    {loading ? "Processing..." : "Pay Now"}
                </button>
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
            </form>
        </div>
    );
};

const StripePayment = () => {
    const { userId, serviceId } = useParams();
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm userId={userId} serviceId={serviceId} />
        </Elements>
    );
};

export default StripePayment;

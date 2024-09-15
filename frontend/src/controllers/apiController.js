import axios from "axios";

//const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = "https://custapp-q43w.onrender.com/api";

const apiController = {
    googleLogin: async (token) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/google`, {
                token,
            });
            return response.data;
        } catch (error) {
            console.error("Google login error:", error);
            throw error;
        }
    },
    searchServices: async (params) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `${API_BASE_URL}/services/search`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error searching services:", error);
            throw error;
        }
    },
    getServiceDetails: async (id) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${API_BASE_URL}/services/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching service details:", error);
            throw error;
        }
    },
    getAllServices: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/services`); // Fetch all services
            return response.data;
        } catch (error) {
            console.error("Error fetching all services:", error);
            throw error;
        }
    },

    bookService: async ({ userId, serviceId, bookingDate }) => {
        const response = await axios.post(`${API_BASE_URL}/bookings/book`, {
            userId,
            serviceId,
            bookingDate,
        });
        return response;
    },

    getUserBookings: async (userId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios({
                method: "GET",
                url: `${API_BASE_URL}/users/${userId}/bookings`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error("Error fetching user bookings:", error);
            throw error;
        }
    },

    createPaymentIntent: async ({ amount, email }) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/payments/create-payment-intent`,
                {
                    amount,
                    email,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error creating payment intent:", error);
            throw error;
        }
    },

    getPaymentIntent: async (paymentIntentId) => {
        const response = await axios.get(
            `${API_BASE_URL}/payments/payment-intent/${paymentIntentId}`
        );
        return response.data;
    },
};

export default apiController;

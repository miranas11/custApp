import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import ServiceDetails from "./components/ServiceDetails";
import Home from "./components/Home";
import Navbar from "./components/utils/Navbar";
import MyBookings from "./components/MyBookings";
import StripePayment from "./components/StripePayement";
import SplashScreen from "./components/SplashScreen";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Home />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/services/:id"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <ServiceDetails />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payment/:userId/:serviceId/"
                    element={<StripePayment />}
                />
            </Routes>
        </Router>
    );
};

export default App;

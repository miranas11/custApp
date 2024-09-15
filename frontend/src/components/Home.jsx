import React, { useState, useEffect } from "react";
import apiController from "../controllers/apiController";
import "../styles/Home.css"; // Import the CSS file
import SearchBar from "./utils/SearchBar";
import ServiceList from "./utils/ServiceList";

const Home = () => {
    const [services, setServices] = useState([]); // Store services
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch all services on component mount
    useEffect(() => {
        const fetchAllServices = async () => {
            try {
                const allServices = await apiController.getAllServices(); // Fetch all services
                setServices(allServices); // Set services in state
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setError("Failed to fetch services.");
                setLoading(false);
            }
        };

        fetchAllServices();
    }, []);

    // Function to handle search results
    const handleSearchResults = (results) => {
        setServices(results); // Update services with search results
    };

    return (
        <div className="home-container">
            <h1>Service Listings</h1>

            {/* Search Bar for filtering services */}
            <div className="search-bar-container">
                <SearchBar onResults={handleSearchResults} />
            </div>

            {/* Loading State */}
            {loading && <p className="loading-message">Loading services...</p>}

            {/* Error State */}
            {error && <p className="error-message">{error}</p>}

            {/* Service List */}
            {!loading && services.length > 0 && (
                <ServiceList services={services} />
            )}

            {/* Empty State */}
            {!loading && services.length === 0 && (
                <p className="no-services-message">No services available.</p>
            )}
        </div>
    );
};

export default Home;

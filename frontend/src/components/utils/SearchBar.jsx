import React, { useState } from "react";
import apiController from "../../controllers/apiController";

const SearchBar = ({ onResults }) => {
    const [location, setLocation] = useState("");
    const [serviceType, setServiceType] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const handleSearch = async () => {
        try {
            const results = await apiController.searchServices({
                location,
                serviceType,
                category,
                date,
            });
            onResults(results);
        } catch (error) {
            console.error("Error searching services:", error);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input
                type="text"
                placeholder="Service Type"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;

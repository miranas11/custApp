import React from "react";
import { Link } from "react-router-dom";

const ServiceList = ({ services }) => {
    if (services.length === 0) {
        return <div>No services found. Please search for a service.</div>;
    }

    return (
        <div className="service-list">
            {services.map((service) => (
                <div key={service._id} className="service-card">
                    {/* Left side: Service details */}
                    <div className="service-card-content">
                        <h3>{service.title}</h3>
                        <p>
                            <strong>Location:</strong> {service.location.city}
                        </p>
                        <p>
                            <strong>Price:</strong> ${service.price}
                        </p>
                        <Link to={`/services/${service._id}`}>
                            View Details
                        </Link>
                    </div>

                    {/* Right side: Service image */}
                    <img
                        className="service-card-image"
                        src={service.images[0]} // Assuming `images` is an array
                        alt={service.title}
                    />
                </div>
            ))}
        </div>
    );
};

export default ServiceList;

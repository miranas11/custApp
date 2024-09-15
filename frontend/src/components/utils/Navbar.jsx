import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Navbar.css";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUsername(decodedToken.name);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                {username ? (
                    <p className="greeting">Hi, {username}</p>
                ) : (
                    <p>Welcome!</p>
                )}

                {/* My Bookings Button */}
                <Link to="/my-bookings" className="navbar-button">
                    My Bookings
                </Link>

                {/* Logout Button */}
                {username && (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

const SplashScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            navigate("/login");
        }, 3000);
    }, [navigate]);

    return (
        isLoading && (
            <div style={styles.splashContainer}>
                <img src={logo} alt="App Logo" style={styles.logo} />
            </div>
        )
    );
};

const styles = {
    splashContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff",
    },
    logo: {
        width: "150px",
    },
};

export default SplashScreen;

import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import apiController from "../controllers/apiController";

const GOOGLE_CLIENT_ID =
    "583010194675-voobq76vb6l882dm5nu32b91opduqpp2.apps.googleusercontent.com";

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const { credential } = credentialResponse;
            const response = await apiController.googleLogin(credential);

            if (response.success) {
                localStorage.setItem("token", response.token);
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleGoogleError = (error) => {
        console.error("Google Login failed", error);
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div style={styles.container}>
                <h2>Login with Google</h2>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
    },
};

export default Login;

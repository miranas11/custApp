const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const GOOGLE_CLIENT_ID =
    "583010194675-voobq76vb6l882dm5nu32b91opduqpp2.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const JWT_SECRET = "secret";

const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });

        const { email, name, picture } = ticket.getPayload();

        // Find or create a user
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                name,
                email,
                profilePicture: picture,
            });
            await user.save();
        }

        // Generate JWT token for session
        const jwtToken = jwt.sign(
            { userId: user._id, name: name, email, email },
            JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({ success: true, token: jwtToken });
    } catch (error) {
        console.error("Google login error:", error);
        res.status(500).json({
            success: false,
            message: "Google login failed",
        });
    }
};

module.exports = { googleLogin };

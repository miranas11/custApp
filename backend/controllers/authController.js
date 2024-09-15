const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        console.log(token);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
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
            process.env.JWT_SECRET,
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

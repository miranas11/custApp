const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
    "sk_test_51PzCAe07qYo8tts4ijuIbei2gIzDK662uiQ6qrLBYBHJfeZGMjRHA4vTnoeNpbrTELrnXP9V7JiV3T3tsCR3I3lU00cr3eoeD1"
);

router.get("/payment-intent/:id", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
            req.params.id,
            {
                expand: ["charges"],
            }
        );
        res.status(200).json(paymentIntent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount, email } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            receipt_email: email,
            currency: "usd",
            payment_method_types: ["card"],
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

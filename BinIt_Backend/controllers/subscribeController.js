const Subscription = require('../models/subscriptionSchema');

const subscribe= async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    try {
        // If using a database model for subscriptions:
        const newSubscription = new Subscription({ email });
        await newSubscription.save();

        res.status(200).json({ message: "Subscription successful!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error subscribing to news" });
    }
}
module.exports=subscribe;
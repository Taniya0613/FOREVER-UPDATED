import validator from "validator";
import newsletterModel from "../models/newsletterModel.js";

const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        const existing = await newsletterModel.findOne({ email });

        if (existing) {
            return res.json({ success: false, message: "You are already subscribed" })
        }

        await newsletterModel.create({ email, date: Date.now() })

        res.json({ success: true, message: "Subscribed successfully! Check your inbox for 20% off." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { subscribeNewsletter }

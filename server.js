require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// Define the available donation amounts
const donationAmounts = {
    25: 2500, // $25 in cents
    50: 5000, // $50 in cents
    100: 10000 // $100 in cents
};

app.post('/create-checkout-session', async (req, res) => {
    try {
        const { amount } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Donation of $${amount}`
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`,
        });

        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'labeebmuntasir@gmail.com', // Your Gmail address
            pass: 'Qpaiker2004$' // Your Gmail password or app password
        },
        logger: true,
        debug: true
    });

    const mailOptions = {
        from: email,
        to: 'labeebmuntasir@gmail.com', // MSA's email
        subject: `Message from ${name}: ${subject}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
 // Log specific error
            res.status(500).send(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Message sent successfully!');
        }
    });
});


app.listen(3000, () => console.log('Server running on port 3000'));

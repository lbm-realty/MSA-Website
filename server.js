// require("dotenv").config();
// const express = require('express');
// const app = express();
// app.use(express.json());
// app.use(express.static("public"));

// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// const donationAmounts = {
//     25: 2500, // $25 in cents
//     50: 5000, // $50 in cents
//     100: 10000 // $100 in cents
// };

// app.post('/create-checkout-session', async (req, res) => {
//     try {
//         const { amount } = req.body;

//         if (!donationAmounts[amount]) {
//             return res.status(400).json({ error: 'Invalid donation amount' });
//         }

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             line_items: [{
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: `Donation of $${amount}`
//                     },
//                     unit_amount: donationAmounts[amount],
//                 },
//                 quantity: 1,
//             }],
//             success_url: `${process.env.SERVER_URL}/success.html`,
//             cancel_url: `${process.env.SERVER_URL}/cancel.html`,
//         });

//         res.json({ url: session.url });
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// });

// app.listen(3000, () => console.log('Server running on port 3000'));






require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.json());
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

        if (!donationAmounts[amount]) {
            return res.status(400).json({ error: 'Invalid donation amount' });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Donation of $${amount}`
                    },
                    unit_amount: donationAmounts[amount],
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

app.listen(3000, () => console.log('Server running on port 3000'));

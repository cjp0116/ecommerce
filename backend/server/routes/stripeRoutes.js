import Stripe from 'stripe';
import express from 'express';
const stripe = Stripe(process.env.STRIPE_SERVER_KEY);

const router = express.Router();

router.post("/payment", (req, res) => {
  stripe.charges.create({
    source : req.body.tokenId,
    amount : req.body.amount,
    currency : "usd"
  }, (stripeError, stripeRes) => {
    if(stripeError) return res.status(500).json(stripeError);
    return res.status(200).json(stripeRes);
  }) 
})


export default router;
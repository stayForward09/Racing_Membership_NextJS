// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
const stripe = new Stripe(process.env.SECRETKEY ?? '', {
  apiVersion: '2022-11-15',
});

type Data = {
  url: string
}

const createCustomer = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: req.body.customer,
    return_url: req.body.returnURL
  });
  res.status(200).json({ url: session.url })
};

export default createCustomer;

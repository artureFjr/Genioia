// Exemplo mínimo de rota para iniciar pagamento (Stripe Checkout)
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export default async function handler(req,res){
  if (req.method !== 'POST') return res.status(405).end()
  try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?canceled=true`,
    })
    return res.status(200).json({ url: session.url })
  }catch(err){ console.error(err); return res.status(500).json({ error: 'Stripe error' }) }
}

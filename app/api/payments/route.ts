import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from '@/lib/payments'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const POST = async (req: NextRequest) =>  {
    const payload = await req.json()
    const sig = req.headers.get('stripe-signature')!

    let event;

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!
    
    try {
        event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret)
        switch (event.type) {
            case 'checkout.session.completed':
                const sessionId = event.data.object.id;
                console.log('checkout session completed');
                
                
                const session = await stripe.checkout.sessions.retrieve(sessionId, {
                    expand: ['line_items']
                });

                await handleCheckoutSessionCompleted({ session , stripe});

                break;
            case 'customer.subscription.deleted':
                console.log('Subscription canceled');
                
                const subscription = event.data.object;
                const subscriptionId = event.data.object.id;

                await handleSubscriptionDeleted({ subscriptionId, stripe })
                console.log(subscription)
                console.log('Customer session deleted:', subscription);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

    } catch (error: any) {
        return NextResponse.json({ message: `Failed to trigger webhook: ${error.message}` }, { status: 400 })   
    }

    return NextResponse.json({
        status: 400,
    })
}
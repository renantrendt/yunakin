import stripe from "@/utils/stripe";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    let event = (await request.json()) as any;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = 'whsec_12345';
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers.get('stripe-signature');

        try {
            if (!signature) throw new Error('Stripe signature is missing')
            event = stripe.webhooks.constructEvent(
                event,
                signature,
                endpointSecret
            );
        } catch (err: any) {
            console.log(`⚠️  Webhook signature verification failed.`, err.message);
            return NextResponse.json({}, { status: 400 });
        }
    }
    let subscription;
    let status;

    const dataObject = event.data.object;

    // Handle the event
    switch (event.type) {
        case 'invoice.payment_succeeded':
            if (dataObject['billing_reason'] === 'subscription_create') {
                // The subscription automatically activates after successful payment
                // Set the payment method used to pay the first invoice
                // as the default payment method for that subscription
                const subscription_id = dataObject['subscription']
                const payment_intent_id = dataObject['payment_intent']

                // Retrieve the payment intent used to pay the subscription
                const payment_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

                try {
                    const subscription = await stripe.subscriptions.update(
                        subscription_id,
                        {
                            default_payment_method: payment_intent.payment_method as string ?? undefined,
                        },
                    );

                    console.log("Default payment method set for subscription:" + payment_intent.payment_method);
                } catch (err) {
                    console.log(err);
                    console.log(`⚠️  Falied to update the default payment method for subscription: ${subscription_id}`);
                }
            }
        case 'invoice.payment_failed':
            // If the payment fails or the customer does not have a valid payment method,
            //  an invoice.payment_failed event is sent, the subscription becomes past_due.
            // Use this webhook to notify your user that their payment has
            // failed and to retrieve new card details.
            break;
        case 'invoice.finalized':
            // If you want to manually send out invoices to your customers
            // or store them locally to reference to avoid hitting Stripe rate limits.
            break;
        case 'customer.subscription.trial_will_end':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription trial ending.
            // handleSubscriptionTrialEnding(subscription);
            break;
        case 'customer.subscription.deleted':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription deleted.
            // handleSubscriptionDeleted(subscriptionDeleted);
            break;
        case 'customer.subscription.created':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription created.
            // handleSubscriptionCreated(subscription);
            break;
        case 'customer.subscription.updated':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            // Then define and call a method to handle the subscription update.
            // handleSubscriptionUpdated(subscription);
            break;
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}.`);
    }
    return NextResponse.json({}, { status: 200 });
}

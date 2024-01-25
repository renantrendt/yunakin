// app/checkout-sessions/route.ts
import stripe from "@/utils/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// data needed for checkout
export interface CheckoutSubscriptionBody {
    price_id: string;
    customerId?: string;
}

export async function POST(req: Request) {
    const body = (await req.json()) as CheckoutSubscriptionBody;
    const origin = req.headers.get("origin") || "http://localhost:3000";

    // if user is logged in, redirect to thank you page, otherwise redirect to signup page.
    const success_url = !body.customerId
        ? `${origin}/checkout?session_id={CHECKOUT_SESSION_ID}&success=true`
        : `${origin}/checkout?session_id={CHECKOUT_SESSION_ID}&success=true`;

    try {
        const session = await stripe.checkout.sessions.create({
            // if user is logged in, stripe will set the email in the checkout page
            customer: body.customerId,
            mode: "subscription", // mode should be subscription
            line_items: [
                // generate inline price and product
                {
                    price: body.price_id,
                    quantity: 1
                }
            ],
            success_url: success_url,
            cancel_url: `${origin}/checkout?canceled=true&session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.json(session);
    } catch (error) {
        if (error instanceof Stripe.errors.StripeError) {
            const { message } = error;
            return NextResponse.json({ message }, { status: error.statusCode });
        }
    }
}

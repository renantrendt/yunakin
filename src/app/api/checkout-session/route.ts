// app/checkout-sessions/route.ts
import { auth } from "@/auth";
import stripe from "@/utils/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// data needed for checkout
export interface CheckoutSubscriptionBody {
    price_id: string;
    customerId?: string;
}

export async function POST(req: Request) {

    const data = await auth()

    if (!data?.user) {
        return NextResponse.json({}, { status: 403 })
    }
    const body = (await req.json()) as CheckoutSubscriptionBody;
    const origin = req.headers.get("origin") || "http://localhost:3000";
    try {
        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            client_reference_id: data?.user?.id ?? "",
            customer_email: data?.user?.email ?? "",
            // if user is logged in, stripe will set the email in the checkout page
            mode: "subscription", // mode should be subscription
            line_items: [
                // generate inline price and product
                {
                    price: body.price_id,
                    quantity: 1
                }
            ],
            subscription_data: {
                metadata: {
                    userId: data?.user?.id ?? "",
                },
            },
            return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.json(session);
    } catch (error) {
        if (error instanceof Stripe.errors.StripeError) {
            const { message } = error;
            return NextResponse.json({ message }, { status: error.statusCode });
        }
    }
}

'use client'
import { CheckoutSubscriptionBody } from '@/app/api/checkout-session/route'
import LoadingIcon from '@/assets/icons/LoadingIcon';
import { loadStripe } from "@stripe/stripe-js";
import React from 'react'
import Stripe from 'stripe';
import { Plans } from './pricing';
export default function PricingProduct({ name, description, price, features }: {
    name: string
    description: string
    price: number
    features: { name: string, plans: Plans[] }[]
}) {

    const [loading, setLoading] = React.useState(false)
    const handleClick = async () => {
        // step 1: load stripe
        const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
        const stripe = await loadStripe(STRIPE_PK);

        // step 2: define the data for monthly subscription
        const body: CheckoutSubscriptionBody = {
            interval: "month",
            amount: price * 100,
            plan: "Monthly",
            planDescription: `Subscribe for $${price} per month`,
        };

        setLoading(true)
        // step 3: make a post fetch api call to /checkout-session handler
        const result = await fetch("/api/checkout-session", {
            method: "post",
            body: JSON.stringify(body, null),
            headers: {
                "content-type": "application/json",
            },
        });

        // step 4: get the data and redirect to checkout using the sessionId
        const data = (await result.json()) as Stripe.Checkout.Session;
        const sessionId = data.id!;
        stripe?.redirectToCheckout({ sessionId });
        setLoading(false)

    };
    return (
        <div className="card bg-base-100 shadow-xl rounded-[32px] h-full p-5">
            <div className="card-body">
                <div className='flex  flex-col items-center justify-center mb-8'>
                    <h3 className="mb-6 text-4xl font-bold">{name}</h3>
                    <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">{description}</p>
                </div>

                <div className="flex justify-center items-center ">
                    <span className="mr-2 text-5xl font-extrabold">
                        {price}$
                    </span>
                    <span>
                        /month
                    </span>
                </div>

                <div className="card-actions justify-center">
                    <button
                        className="btn btn-primary"
                        onClick={handleClick}
                    >
                        {loading ? <div className='h-6 w-6'><LoadingIcon /> </div> : null} Start
                    </button>
                </div>
                <ul role="list" className="mb-8 space-y-4 text-left">
                    {
                        features.map((feature, index) => {
                            return (
                                <li className="flex items-center space-x-3" key={feature + '-' + index}>
                                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                                    </svg>
                                    <span><b className='text-lg'></b> {feature.name} </span>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        </div>
    )
}

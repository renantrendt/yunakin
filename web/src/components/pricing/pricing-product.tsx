'use client'
import { CheckoutSubscriptionBody } from '@/app/api/checkout-session/route'
import LoadingIcon from '@/assets/icons/LoadingIcon';
import { loadStripe } from "@stripe/stripe-js";
import React from 'react'
import Stripe from 'stripe';
import { Plans } from './pricing';
import Button from '../button/Button';
import TickIcon from '@/assets/icons/TickIcon';
import CrossIcon from '@/assets/icons/CrossIcon';
export default function PricingProduct({ name, description, price, features, plan, recommended }: {
    name: string
    description: string
    price: number
    features: { name: string, plans: Plans[] }[]
    plan: Plans
    recommended?: boolean
}) {

    const [loading, setLoading] = React.useState(false)
    const handleClick = async () => {
        // step 1: load stripe
        const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
        const stripe = await loadStripe(STRIPE_PK);

        // step 2: define the data for monthly subscription
        const body: CheckoutSubscriptionBody = {
            price_id: plan === Plans.PRO ? process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN_ID! : plan === Plans.BUSINESS ? process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PLAN_ID! : process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLAN_ID!,
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
            {recommended && (
                <div className='rounded-[40px] shadow-md  px-6 py-2  bg-white dark:bg-gray-800 text-black dark:text-white w-fit absolute top-[-20px] left-[32%]  '>Recommended</div>
            )}
            <div className="card-body">
                <div className='flex  flex-col items-center justify-center mb-8 '>
                    <h3 className="mb-6 text-4xl font-bold text-black dark:text-white">{name}</h3>
                    <p className="font-light m:text-lg text-black dark:text-white">{description}</p>
                </div>

                <div className="flex justify-center items-center py-10 text-black dark:text-white ">
                    <span className="mr-2 text-5xl font-extrabold ">
                        {price}€
                    </span>
                    <span>
                        /month
                    </span>
                </div>

                <div className="card-actions justify-center">
                    <Button classname='w-full mb-8' onClick={handleClick}>
                        {loading ? <div className='h-6 w-6 text-blu-200'><LoadingIcon /> </div> : null} Start
                    </Button>
                </div>
                <ul role="list" className="mb-8 space-y-4 text-left">
                    {
                        features.map((feature, index) => {
                            return (
                                <li className="flex items-center space-x-3 py-3 px-2 text-black dark:text-white" key={feature + '-' + index}>
                                    {feature.plans.includes(plan) ? <TickIcon /> : <CrossIcon />}
                                    <span><b className='text-lg'></b> {feature.name}</span>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        </div>
    )
}

'use client'
import { CheckoutSubscriptionBody } from '@/app/api/checkout-session/route'
import React from 'react'
import Stripe from 'stripe';
import Button from '../../atomic/button/Button';
import TickIcon from '@/icons/TickIcon';
import CrossIcon from '@/icons/CrossIcon';
import Modal from '../../molecules/modal/Modal';
import CheckoutForm from '@/containers/CheckoutForm';
import customToast from '../../atomic/toast/customToast';
import { Plans } from '@/config/app-config';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import siteUrls from '@/config/site-config';
export default function PricingProduct({ name, description, price, features, plan, recommended, planId, isMonthly }: {
    name: string
    description: string
    price: number
    features: { name: string, plans: Plans[] }[]
    plan: Plans
    planId: string
    recommended?: boolean
    isMonthly?: boolean
}) {
    const { data: session } = useSession()
    const [loading, setLoading] = React.useState(false)
    const [clientSecret, setClientSecret] = React.useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const router = useRouter()
    const handleClick = async () => {

        if (!session?.user) {
            return router.push(`${siteUrls.login}?callbackUrl=${siteUrls.settings}`)
        }
        // step 1: load stripe
        try {
            // step 2: define the data for monthly subscription
            const body: CheckoutSubscriptionBody = {
                price_id: planId
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
            setClientSecret(data.client_secret);
            setIsModalOpen(true);
            setLoading(false)
        } catch (error) {
            customToast.error((error as any).message)
        }

    };
    return (
        <>
            <div className="card  shadow-xl dark:bg-gray-700 rounded-[32px] h-full p-5">
                {recommended && (
                    <div className='rounded-[40px] shadow-md  px-6 py-2  bg-white dark:bg-gray-700 text-black  w-fit absolute top-[-0px] left-[32%]  '>Recommended</div>
                )}
                <div className="card-body">
                    <div className='flex  flex-col items-center justify-center mb-8 '>
                        <h3 className="mb-6 text-4xl font-bold text-black dark:text-white">{name}</h3>
                        <p className="font-light m:text-lg text-black dark:text-white">{description}</p>
                    </div>

                    <div className="flex justify-center items-center py-10 text-black dark:text-white ">
                        <span className="mr-2 text-5xl font-extrabold ">
                            {price.toFixed(2)}€
                        </span>§
                        <span>
                            /{isMonthly ? "month" : "year"}
                        </span>
                    </div>

                    <div className="card-actions justify-center">
                        <Button classname='w-full mb-8' onClick={handleClick} loading={loading} label='Start' />
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
            {clientSecret && <Modal isOpen={isModalOpen} title='stripe' onClose={() => { setIsModalOpen(false) }} > <CheckoutForm clientSecret={clientSecret} /></Modal>}
        </>
    )
}
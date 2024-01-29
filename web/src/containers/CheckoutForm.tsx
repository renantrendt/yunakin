'use client'
import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';
import Modal from '@/components/modal/Modal';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe("pk_test_51OZUfiDikzGwEbQeSvORw9s0ohghLE6uxjeG3PD3OoDVFhZ06bKcbVKleEr7gBdk0RrpkokyHtqtHh1B7ZGIKSYC00436mbd0h");

interface CheckoutFormProps {
    clientSecret: string
}
const CheckoutForm = ({ clientSecret }: CheckoutFormProps) => {

    return (
        <div id="checkout">
            {clientSecret && (
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>

    )
}

export default CheckoutForm
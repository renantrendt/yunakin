// utils/stripe.ts
import platformConfig from '@/config/app-config'
import Stripe from 'stripe'

if (!platformConfig.variables.STRIPE_SECRET_KEY) {
  throw new Error('Missing Stripe secret key')
}

const stripe = new Stripe(platformConfig.variables.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
})

export default stripe

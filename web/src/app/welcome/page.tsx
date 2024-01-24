import { WelcomeEmailTemplate } from '@/components/template/email/WelcomeEmailTemplate'
import React from 'react'

const WelcomeEmail = () => {
    return (
        <WelcomeEmailTemplate confirmationEmailLink='https://sleekvid.com/confirmationEmail'
            name='Fortan Pireva' />
    )
}

export default WelcomeEmail
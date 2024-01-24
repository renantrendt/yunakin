import * as React from 'react';
import { Html } from '@react-email/html';
import { Button } from '@react-email/button';
interface WelcomeEmailTemplateProps {
    name: string;
    confirmationEmailLink: string;
}

export const WelcomeEmailTemplate: React.FC<Readonly<WelcomeEmailTemplateProps>> = ({
    name,
}) => (
    <div className="flex min-h-screen flex-col w-full">
        <div className="container pt-24 flex flex-col justify-start   mx-auto p-2 md:px-24 items-start bg-white">
            <Link className="btn btn-ghost text-xl" href='/'>NextStackSaaS</Link>
            <h1 className='font-bold text-3xl pt-8'>Hi {name}</h1>
            <p>You recently created an account and requested that the confirmation email is resend</p><p>Click the button below to confirm the account,</p>
            <Button classname='my-8'>Confirm your  Email</Button>
            <div className='max-w-lg'>
                <p>If you did not create an account please ignore this email or reply to let us know.</p>

                <p>Thanks, \n</p>
                <p>NextstackSaaS team</p>
            </div>


            <div className='border-1 border-black'>
                P.S. We also love hearing from you and helping you with any issues you have. Please reply to this email if you want to ask a question or just say hi.
            </div>
        </div>
        <div className="email-footer flex-1 w-full  bg-[#FAFAFA] flex justify-center items-center">
            <div className='max-w-xl flex flex-col gap-4'>
                <div role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <div className="socials flex justify-between items-center ">
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                </div>
                <div className="terms flex justify-between items-center gap-8 ">
                    <p>Privacy Policy</p>
                    <p>Terms & Conditions</p>
                    <p>Cookies</p>
                </div>
                <div className="location ">
                    <p>© 2021, Company Inc. All right reserved.</p>
                </div>
            </div>

        </div>
    </div>
);

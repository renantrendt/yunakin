import * as React from 'react';

interface WelcomeEmailTemplateProps {
    firstName: string;
}

export const WelcomeEmailTemplate: React.FC<Readonly<WelcomeEmailTemplateProps>> = ({
    firstName,
}) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
);

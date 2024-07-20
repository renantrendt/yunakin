import React from 'react'

const ClientThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <div data-theme="light">
            {children}
        </div>
    )
}

export default ClientThemeProvider
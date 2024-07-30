import React from 'react'
import Script from 'next/script'

const BenefitsPage = () => {
    return (
        <>
            <div className="youakin-iframe-container" style={{ width: "100%" }}>
                <iframe id="youakin_frame" src='https://youakin.com/youakin/memberbenefits?embedded=true' width='100%' height='1000' scrolling='no'></iframe>
            </div>
            <Script data-client-slug="youakin" dangerouslySetInnerHTML={{
                __html: `
                window.addEventListener('message', (event) => { if (event.data && event.data.type === 'youakin_iframeHeight') { const iframe = document.getElementById('youakin_frame'); if (iframe) {iframe.style.height = event.data.height + 'px'; } } });
                `}}>
            </Script></>
    )
}

export default BenefitsPage
"use client";

import React from "react";
import CompanyLogo1 from '@/icons/company-icons/logo-ipsum1.svg'
//import CompanyLogo2 from '@/icons/company-icons/logo-ipsum2.svg'
import CompanyLogo3 from '@/icons/company-icons/logo-ipsum3.svg'
//import CompanyLogo4 from '@/icons/company-icons/logo-ipsum4.svg'
//import CompanyLogo5 from '@/icons/company-icons/logo-ipsum5.svg'
//import CompanyLogo6 from '@/icons/company-icons/logo-ipsum6.svg'
//import CompanyLogo7 from '@/icons/company-icons/logo-ipsum7.svg'
//import CompanyLogo8 from '@/icons/company-icons/logo-ipsum8.svg'
import CompanyLogo9 from '@/icons/company-icons/logo-ipsum9.svg'
import CompanyLogo10 from '@/icons/company-icons/logo-ipsum10.svg'

import ParallaxText from "../animated/ParallaxText";
const items = [
    CompanyLogo1, CompanyLogo3, CompanyLogo9, CompanyLogo10
]
export const InfiniteMovingCards = () => {
    return (
        <ParallaxText >
            {items.map((Item, idx) => (
                <Item key={idx} />
            ))}
        </ParallaxText>

    );
};

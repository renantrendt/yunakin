import React, { useRef, useState } from 'react'
import Typography from '../atomic/typography/Typography'
import Button from '../atomic/button/Button'
import * as yup from 'yup'
import { MemberBenefitPageConfig } from '@prisma/client'
const FontColorIcon = () => {
    return (
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.16663 23.9999H25.8333V27.9999H7.16663V23.9999ZM17.1666 5.33325H15.8333C15.2986 5.33325 14.8146 5.65325 14.6053 6.14525L8.15996 21.3332H11.0573L12.7546 17.3332H20.2266L21.9173 21.3332H24.812L18.3946 6.14659C18.2925 5.90538 18.1215 5.69961 17.9031 5.55496C17.6847 5.41032 17.4286 5.3332 17.1666 5.33325ZM13.8866 14.6666L16.4986 8.51192L19.1 14.6666H13.8866Z" fill="#212121" />
        </svg>

    )
}


const ButtonColorIcon = () => {
    return (
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2631_6321)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1102 6.39992L9.78541 12.7999H15.2142L12.8894 6.39992H12.1102ZM17.3486 18.6734L15.7966 14.3998H9.20461L7.65101 18.6734L6.14861 18.1262L10.9902 4.79976H14.011L18.851 18.1262L17.3486 18.6734ZM22.1006 -0.000244141H2.90061C1.57741 -0.000244141 0.50061 1.07656 0.50061 2.39976V21.5998C0.50061 22.923 1.57741 23.9998 2.90061 23.9998H22.1006C23.4238 23.9998 24.5006 22.923 24.5006 21.5998V2.39976C24.5006 1.07656 23.4238 -0.000244141 22.1006 -0.000244141Z" fill="#212121" />
            </g>
            <defs>
                <clipPath id="clip0_2631_6321">
                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>
    )
}

const PageBackgroundColorIcon = () => {
    return (
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2631_6310)">
                <path d="M32.5 0H0.5V32H32.5V0Z" fill="white" fill-opacity="0.01" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1663 24.6667C26.639 24.6667 27.833 23.4727 27.833 22C27.833 21.0181 26.9441 19.6848 25.1663 18C23.3885 19.6848 22.4996 21.0181 22.4996 22C22.4996 23.4727 23.6936 24.6667 25.1663 24.6667Z" fill="#212121" />
                <path d="M14.402 3.66968L16.759 6.0267" stroke="#212121" stroke-width="2.74908" stroke-linecap="round" />
                <path d="M16.2879 5.55542L5.91699 15.9263L13.4595 23.4688L23.8303 13.0979L16.2879 5.55542Z" stroke="#212121" stroke-width="2.74908" stroke-linejoin="round" />
                <path d="M8.50037 13.3821L19.8077 17.0997" stroke="#212121" stroke-width="2.74908" stroke-linecap="round" />
                <path d="M3.16663 28.6667H29.8333" stroke="#212121" stroke-width="2.74908" stroke-linecap="round" />
            </g>
            <defs>
                <clipPath id="clip0_2631_6310">
                    <rect width="32" height="32" fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>

    )
}

const CardBackgroundColorIcon = () => {
    return (
        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.16663 16.5523V23.3333C3.16663 25.1742 4.65901 26.6666 6.49996 26.6666H26.5C28.3409 26.6666 29.8333 25.1742 29.8333 23.3333V8.66658C29.8333 6.82564 28.3409 5.33325 26.5 5.33325H14.575L17.8038 8.56216C18.9181 9.67642 19.2376 11.2845 18.7622 12.6819C19.2696 12.7389 19.7618 12.9618 20.1506 13.3507L20.1536 13.3537L20.1584 13.3583L20.1702 13.3705L20.1973 13.3979C20.2217 13.4231 20.2545 13.4571 20.2945 13.4994C20.3744 13.5837 20.4836 13.7017 20.6125 13.8474C20.8681 14.1365 21.2125 14.5481 21.5621 15.0349C21.9072 15.5155 22.2878 16.1118 22.5893 16.7686C22.8817 17.4055 23.1666 18.2426 23.1666 19.1665C23.1666 21.6418 21.3077 23.9998 18.5 23.9998C15.6922 23.9998 13.8333 21.6418 13.8333 19.1665C13.8333 18.7797 13.8833 18.4082 13.9628 18.0602L12.147 19.8759C10.5849 21.4379 8.05227 21.4379 6.49017 19.8759L3.16663 16.5523Z" fill="#212121" />
            <path d="M15.6224 17.325C15.3721 17.8702 15.1666 18.5088 15.1666 19.1666C15.1666 21.0205 16.5385 22.6666 18.5 22.6666C20.4614 22.6666 21.8333 21.0205 21.8333 19.1666C21.8333 18.5088 21.6278 17.8702 21.3776 17.325C21.1233 16.7712 20.7936 16.2508 20.4789 15.8126C20.1625 15.3718 19.8482 14.996 19.6137 14.7308L19.207 14.2929C18.8165 13.9024 18.1834 13.9024 17.7929 14.2929L17.7856 14.3005C17.7082 14.3822 17.5002 14.602 17.3862 14.7308C17.1517 14.996 16.8374 15.3718 16.521 15.8126C16.2064 16.2508 15.8766 16.7712 15.6224 17.325ZM18.5 16.5125C18.6144 16.6554 18.7346 16.8122 18.8544 16.979C19.123 17.3533 19.3766 17.76 19.5598 18.1593C19.747 18.567 19.8333 18.9077 19.8333 19.1666C19.8333 20.0884 19.1921 20.6666 18.5 20.6666C17.8078 20.6666 17.1666 20.0884 17.1666 19.1666C17.1666 18.9077 17.2529 18.567 17.4401 18.1593C17.6233 17.76 17.8769 17.3533 18.1456 16.979C18.2653 16.8122 18.3856 16.6554 18.5 16.5125Z" fill="#212121" />
            <path d="M9.49996 1.33325C8.94768 1.33325 8.49996 1.78097 8.49996 2.33325V4.67415C8.45764 4.71145 8.41621 4.75033 8.37577 4.79078L2.71892 10.4476C1.67752 11.489 1.67752 13.1775 2.71892 14.2189L7.43296 18.9329C8.47436 19.9743 10.1628 19.9743 11.2042 18.9329L16.8611 13.2761C17.9024 12.2347 17.9024 10.5462 16.8611 9.50482L12.147 4.79078C11.687 4.33083 11.1009 4.07401 10.5 4.02036V2.33325C10.5 1.78097 10.0523 1.33325 9.49996 1.33325ZM8.49996 7.49501V8.33325C8.49996 8.88553 8.94768 9.33325 9.49996 9.33325C10.0523 9.33325 10.5 8.88553 10.5 8.33325V6.0537C10.5848 6.08616 10.6644 6.1366 10.7328 6.205L15.4468 10.919C15.566 11.0383 15.6307 11.1915 15.6407 11.3476H4.6474L8.49996 7.49501ZM8.84717 17.5187L4.67604 13.3475H13.9611L9.78999 17.5187C9.52963 17.779 9.10752 17.779 8.84717 17.5187Z" fill="#212121" />
        </svg>
    )
}

interface CustomizePageActionsProps {
    loading: boolean
    publishChanges: () => void
    config: MemberBenefitPageConfig
    onUpdate: (property: keyof MemberBenefitPageConfig, value: string) => void

}
interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon: React.ReactNode
}

const ColorInput = ({ icon, ...props }: ColorInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleIconClick = () => {
        setIsOpen(!isOpen);
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className="color-input cursor-pointer relative">
            <input
                ref={inputRef}
                type="color"
                className={'opacity-0 absolute top-2 left-0'}
                onChange={props.onChange}
                value={props.value}
                {...props}
            />
            <div className={` ${isOpen ? 'color-input__icon--open' : ''}`} onClick={handleIconClick}>
                {icon}
            </div>
        </div>
    );
};

const CustomizePageActions = ({ loading, publishChanges, config, onUpdate }: CustomizePageActionsProps) => {
    return (
        <div className=' fixed  bg-landing-background w-[1280px]  mb-8 p-3 rounded-xl z-30 flex flex-col gap-6 justify-start'>
            <Typography type="p" className="text-[#858585] font-normal text-sm w-full text-left">Customization Tools</Typography>
            <div className='flex  w-full justify-between items-center' >
                <div className='edit flex items-center gap-2'>

                    <ColorInput
                        icon={<FontColorIcon />}
                        value={config.textColor}
                        onChange={(e) => {
                            onUpdate('textColor', e.target.value)
                        }}
                    />
                    <ColorInput
                        icon={<ButtonColorIcon />}
                        value={config.buttonColor}
                        onChange={(e) => {
                            onUpdate('buttonColor', e.target.value)
                        }}

                    />
                    <ColorInput
                        icon={<PageBackgroundColorIcon />}
                        value={config.pageBackgroundColor}
                        onChange={(e) => {
                            onUpdate('backgroundColor', e.target.value)
                        }}
                    />
                    <ColorInput
                        icon={<CardBackgroundColorIcon />}
                        value={config.cardBackgroundColor}
                        onChange={(e) => {
                            onUpdate('cardBackgroundColor', e.target.value)
                        }}
                    />
                </div>
                <div className='preview flex gap-2'>
                    <Button variant="primary" className='w-full' label="Publish Changes" loading={loading}
                        onClick={publishChanges}
                    />

                    <Button variant="primary" className='w-full' label="Publish Changes" loading={loading}
                        onClick={publishChanges}
                    />
                </div>
            </div >
        </div>
    )
}

export default CustomizePageActions
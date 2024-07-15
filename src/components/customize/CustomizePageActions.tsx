import React, { useRef, useState } from 'react'
import Typography from '../atomic/typography/Typography'
import Button from '../atomic/button/Button'
import * as yup from 'yup'
import { MemberBenefitPageConfig } from '@prisma/client'
import Dropdown from '../atomic/dropdown/Dropdown'
import Toggle from '../atomic/toggle/Toggle'

import FontColorIcon from "@/icons/editor/font-color-icon.svg"
import ButtonColorIcon from "@/icons/editor/button-color-icon.svg"
import PageBackgroundColorIcon from "@/icons/editor/background-color-icon.svg"
import CardBackgroundColorIcon from "@/icons/editor/card-bacground-color-icon.svg"
import { Share2Icon } from '@radix-ui/react-icons'
import LaunchIcon from "@/icons/editor/launch-icon.svg"
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
interface CustomizePageActionsProps {
    loading: boolean
    publishChanges: () => void
    config: MemberBenefitPageConfig
    onUpdate: (property: keyof MemberBenefitPageConfig, value: string | boolean) => void
    openShareModal: () => void

}

const CustomizePageActions = ({ loading, publishChanges, config, onUpdate, openShareModal }: CustomizePageActionsProps) => {
    return (
        <div className='   bg-landing-background    rounded-xl z-30 flex flex-col gap-6 justify-start'>
            <div className='flex flex-col gap-4 lg:flex-row  w-full justify-between items-center' >
                <div className='flex  flex-row justify-between items-center gap-4 w-full lg:w-fit  lg:gap-24  flex-nowrap'>

                    <div className='flex flex-col lg:flex-row justify-start items-start lg:items-center  gap-3 lg:gap-6'>
                        <Dropdown
                            id="primaryFont"
                            name="primaryFont"
                            onChange={(e) => {
                                onUpdate('primaryFont', e)
                            }}
                            className='min-w-[150px]'
                            value={config.primaryFont}
                            options={[{
                                label: 'Open Sans',
                                value: 'openSans'
                            }, {
                                label: 'Roboto',
                                value: 'roboto'
                            }, {
                                label: 'Poppins',
                                value: 'poppins'
                            }, {
                                label: 'Fraunces',
                                value: 'fraunces'
                            },
                            {
                                label: 'Gelica',
                                value: 'gelica'
                            },
                            {
                                label: 'Satoshi',
                                value: 'satoshi'
                            }]}
                        />
                        <div className='flex gap-5 items-center'>

                            <ColorInput
                                icon={<FontColorIcon className="w-5 h-5 lg:w-7 lg:h-7" />}
                                value={config.textColor}
                                onChange={(e) => {
                                    onUpdate('textColor', e.target.value)
                                }}
                            />
                            <ColorInput
                                icon={<ButtonColorIcon className="w-5 h-5 lg:w-7 lg:h-7" />}
                                value={config.buttonColor}
                                onChange={(e) => {
                                    onUpdate('buttonColor', e.target.value)
                                }}

                            />
                            <ColorInput
                                icon={<PageBackgroundColorIcon className="w-5 h-5 lg:w-7 lg:h-7" />}
                                value={config.backgroundColor}
                                onChange={(e) => {
                                    onUpdate('backgroundColor', e.target.value)
                                }}
                            />
                            <ColorInput
                                icon={<CardBackgroundColorIcon className="w-5 h-5 lg:w-7 lg:h-7" />}
                                value={config.cardBackgroundColor}
                                onChange={(e) => {
                                    onUpdate('cardBackgroundColor', e.target.value)
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-end  xl:flex-row  gap-2 lg:gap-10 lg:items-center'>
                        <Toggle label='Suggest Deals' checked={config.suggestDeal ?? true} onChange={(val: boolean) => {
                            onUpdate('suggestDeal', val)
                        }} />
                        <Toggle label='Login Required' disabled checked={false} onChange={() => { }} />
                    </div>
                </div>
                <div className=' flex w-full lg:w-fit  flex-row gap-2'>
                    <Button variant="secondary" className='w-full' label="Share" loading={loading}
                        onClick={openShareModal}
                        icon={<Share2Icon />}
                    />

                    <Button variant="primary" className='w-full' label="Publish Changes" loading={loading}
                        onClick={publishChanges}
                        icon={<LaunchIcon />}
                    />
                </div>
            </div >
        </div>
    )
}

export default CustomizePageActions
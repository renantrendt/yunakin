import Button from '@/components/atomic/button/Button'
import Modal from '@/components/atomic/modal/Modal'
import { useTranslation } from '@/lib/i18n/client'
import { cn } from '@/utils/cn'
import { Cross1Icon } from '@radix-ui/react-icons'
import Image from 'next/image'
import React from 'react'

interface DotProps {
    selected: boolean
}


const Dot = ({ selected }: DotProps) => {
    return (
        <div className={cn('dot w-2 h-2 rounded-full bg-[#DBDBDB]', { 'bg-[#121212]': selected })}></div>
    )
}

interface OnboardingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OnboardingModal = (props: OnboardingModalProps) => {
    const { t } = useTranslation('onboarding')
    const [step, setStep] = React.useState(1)
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} className='lg:max-w-[448px]'
            closeOnOutsideClick={false}
            showCloseButton={false}
        >
            <div className='container  flex flex-col  gap-6 p-8 justify-center content'>

                <div className='figure w-full  min-h-[100px] lg:min-h-[200px] h-fit  rounded-lg '>
                    {<Image src={`/images/onboarding/modal/part${step}.svg`} alt='illustration' width={80} height={80} className='w-full h-full object-contain' />}
                </div>
                <div className="content flex justify-center flex-col items-center">
                    <h1 className='title text-black font-bold text-[18px] leading-[150%]'>{t(`onboardingModal.step${step}.title`)}</h1>
                    <p className='text-center'>{t(`onboardingModal.step${step}.description`)}</p>

                </div>

                <div className="dots flex gap-3 justify-center mt-2">
                    {Array(4).fill(0).map((_, index) => (
                        <Dot selected={index + 1 <= step} key={index} />
                    ))}
                </div>
                <div className="buttons flex justify-center w-full gap-2 mt-4">
                    <Button
                        className='button w-full'
                        onClick={() => {
                            if (step === 1) {
                                props.onClose()
                                return
                            }
                            setStep(step - 1)
                        }}
                        variant='secondary'
                        label={`${step > 1 ? 'Back' : 'Skip'}`}
                    />
                    <Button
                        className='button w-full'
                        onClick={() => {
                            if (step === 4) {
                                props.onClose()
                                return
                            }
                            setStep(step + 1)
                        }}
                        variant='primary'
                        label={`${step === 4 ? 'Start' : 'Next'}`}
                    />
                </div>

            </div>
        </Modal>
    )
}

export default OnboardingModal
"use client";
import Modal from '@/components/atomic/modal/Modal';
import React from 'react'
import { Category, MemberBenefit } from '@prisma/client';
import { DealType, MemberBenefitVisibility, PartnershipType } from '@/lib/types';
import { useTranslation } from '@/lib/i18n/client';
import _ from 'lodash';
import { cn } from '@/utils/cn';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import AddMemberBenefitStepOne from './add-member-benefit-modal/AddMemberBenefitStepOne';
import AddMemberBenefitStepTwo from './add-member-benefit-modal/AddMemberBenefitStepTwo';

interface AddMemberBenefitModalProps {
    onClose: () => void;
    onCreate: (data: any) => void;
    onUpdate: (data: any) => void;
    categories: Category[];
    editMemberBenefit?: MemberBenefit;
    loading: boolean;
    isOpen: boolean;
}



interface FormValues extends MemberBenefit {
    deal_type: string
    partnership_types: string[]
    image_type: string
    visibility: MemberBenefitVisibility
}


const AddMemberBenefitModal = ({ onClose, onCreate, categories, editMemberBenefit, onUpdate, loading, isOpen }: AddMemberBenefitModalProps) => {
    const [step, setStep] = React.useState(1)


    const [memberBenefit, setMemberBenefit] = React.useState<FormValues | null>({
        deal_type: editMemberBenefit?.dealType ?? DealType.COMPANY,
        partnership_types: editMemberBenefit?.partnershipTypes?.split(',') ?? [PartnershipType.ADS, PartnershipType.SPONSOR],
        visibility: MemberBenefitVisibility.PUBLIC,
        categoryId: categories[0]?.id || '',
        image_type: '',
        ...editMemberBenefit
    } as FormValues)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (data: FormValues) => {
        // onTagChange(data as Tag)
        // check if image is uploaded
        console.log(data)
        if (editMemberBenefit) {
            // update
            onUpdate({
                ...data,
                id: editMemberBenefit.id,
            })
            return;
        }
        onCreate(data)
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}
            closeOnOutsideClick={false}
            className='relative scale-100'
        >

            <div className='flex flex-col p-10 pb-0 pt-0 gap-8  relative overflow-scroll '>

                <div className='flex justify-between  pt-10 items-center relative'>
                    <div className='flex gap-1  lg:gap-2'>
                        {step == 1 && <span className={cn('bg-white border-[1px] rounded-full w-6 h-6 border-[#ECECEC] text-black text-center', { "border-[#FFDD04]": step == 1 })} >
                            1
                        </span>}
                        {step == 2 && <CheckIcon className='bg-[#FFDD04] rounded-full w-6 h-6' />}
                        <p>Deal</p>
                    </div>
                    <span className=' left-0 right-2 mx-auto  w-[40%] lg:w-[60%] h-px  bg-[#CECECE]'>&nbsp;</span>
                    <div className='flex  gap-1 lg:gap-2'>
                        <span className={cn('bg-white border-[1px] border-[#ECECEC] rounded-full w-6 h-6 text-black text-center', { "border-[#FFDD04]": step == 2 })}>
                            2
                        </span>
                        <p>Content</p>
                    </div>

                </div>

                {step == 1 && <AddMemberBenefitStepOne
                    deal_type={memberBenefit?.deal_type || ''}
                    partnership_types={memberBenefit?.partnership_types || []}
                    visibility={memberBenefit?.visibility || MemberBenefitVisibility.PUBLIC}
                    onSubmit={(data: any) => {
                        setMemberBenefit({
                            ...memberBenefit,
                            ...data,
                        })
                        setStep(step + 1)
                    }}
                />}

                {step == 2 && <AddMemberBenefitStepTwo
                    loading={loading}
                    onBack={(data: any) => {
                        setMemberBenefit({
                            ...memberBenefit,
                            ...data,
                            image_type: data.imageType,
                        })
                        setStep(1)
                    }}
                    onSubmit={(data: any) => {
                        const mergedBenefit = {
                            ...memberBenefit,
                            ...data,
                            title: data.title,
                            id: editMemberBenefit?.id,
                        }
                        console.log(mergedBenefit)
                        if (editMemberBenefit) {
                            // update
                            onUpdate(mergedBenefit)
                            return;
                        }
                        onCreate(mergedBenefit)
                    }
                    }
                    data={{
                        title: memberBenefit?.title || '',
                        description: memberBenefit?.description || '',
                        imageURL: memberBenefit?.imageURL || '',
                        categoryId: memberBenefit?.categoryId || '',
                        code: memberBenefit?.code || '',
                        link: memberBenefit?.link || '',
                        location: memberBenefit?.location || '',
                        domain: memberBenefit?.domain || '',
                        offer: memberBenefit?.offer || '',
                        imageType: memberBenefit?.image_type || '',
                    }}
                    categories={categories}
                />}
            </div>
        </Modal >
    )
}

export default AddMemberBenefitModal
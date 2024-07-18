"use client";
import Button from '@/components/atomic/button/Button';
import InputField from '@/components/atomic/input/InputField';
import Modal from '@/components/atomic/modal/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import Dropdown from '../atomic/dropdown/Dropdown';
import { Category, MemberBenefit } from '@prisma/client';
import ImageUploader from '../atomic/file-uploader/ImageUploader';
import { DealType, MemberBenefitVisibility, PartnershipType } from '@/lib/types';
import { useTranslation } from '@/lib/i18n/client';
import _ from 'lodash';
import { cn } from '@/utils/cn';
import Typography from '../atomic/typography/Typography';
import Divider from '../atomic/divider/Divider';
import RadioGroup from '../atomic/radiogroup/radiogroup';
import CheckboxGroup from '../atomic/checkbox/CheckboxGroup';
import { ArrowLeftIcon, Cross1Icon } from '@radix-ui/react-icons';
import TextArea from '../atomic/textarea/TextArea';
import AddMemberBenefitStepOne from './add-member-benefit-modal/AddMemberBenefitStepOne';
import AddMemberBenefitStepTwo from './add-member-benefit-modal/AddMemberBenefitStepTwo';

interface AddMemberBenefitModalProps {
    onClose: () => void;
    onCreate: (data: any) => void;
    onUpdate: (data: any) => void;
    categories: Category[];
    editMemberBenefit?: MemberBenefit;
    loading: boolean;
    isOpen?: boolean;
}



interface FormValues extends MemberBenefit {
    deal_type: string
    partnership_types: string[]
    image_type: string
    visibility: MemberBenefitVisibility
}


const AddMemberBenefitModal = ({ onClose, onCreate, categories, editMemberBenefit, onUpdate, loading, isOpen }: AddMemberBenefitModalProps) => {
    const { t } = useTranslation("dashboard")
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
        >
            <div className='flex flex-col p-10 gap-8 '>
                <div className='justify-between flex w-full'>
                    <Cross1Icon onClick={onClose} className=' absolute cursor-pointer !w-fit !p-0 bg-transparent border-none hover:bg-transparent !min-w-fit  right-8 top-8' />
                </div>
                <div className='flex justify-between items-center relative'>
                    <div className='flex gap-1  lg:gap-2'>
                        <span className={cn('bg-white border-[1px] rounded-full w-6 h-6 border-[#ECECEC] text-black text-center', { "border-[#FFDD04]": step == 1 })} >
                            1
                        </span>
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
                            title: data.name,
                        })
                        setStep(1)
                    }}
                    onSubmit={(data: any) => {
                        const mergedBenefit = {
                            ...memberBenefit,
                            ...data,

                            id: editMemberBenefit?.id,
                        }
                        if (editMemberBenefit) {
                            // update
                            onUpdate(mergedBenefit)
                            return;
                        }
                        onCreate(mergedBenefit)
                    }
                    }
                    data={{
                        name: memberBenefit?.title || '',
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
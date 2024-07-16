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
import { MemberBenefitVisibility } from '@/lib/types';
import { useTranslation } from '@/lib/i18n/client';
import _ from 'lodash';
import { cn } from '@/utils/cn';
import Typography from '../atomic/typography/Typography';
import Divider from '../atomic/divider/Divider';
import RadioGroup from '../atomic/radiogroup/radiogroup';
import CheckboxGroup from '../atomic/checkbox/CheckboxGroup';

interface AddMemberBenefitModalProps {
    onClose: () => void;
    onCreate: (data: any) => void;
    onUpdate: (data: any) => void;
    categories: Category[];
    editMemberBenefit?: MemberBenefit;
    loading: boolean;
}

const schema = yup.object().shape({
    name: yup.string().required(),
    code: yup.string().required(),
    domain: yup.string().required(),
    visiblity: yup.string().default(MemberBenefitVisibility.PUBLIC),
    imageURL: yup.string().optional().nullable(),
    offer: yup.string().optional().nullable(),
    location: yup.string().optional().nullable(),
    link: yup.string().optional().nullable(),
    description: yup.string(),
    categoryId: yup.string().required(),
    deal_type: yup.string().required(),
    partnership_types: yup.array().of(yup.string()).optional().nullable(),
})

interface FormValues {
    imageURL?: string | null | undefined;
    offer?: string | null | undefined;
    location?: string | null | undefined;
    link?: string | null | undefined;
    description?: string | undefined;
    visibility?: string | undefined;
    name: string
    code: string;
    domain: string;
    categoryId: string;
    deal_type: string;
    partnership_types?: string[] | null | undefined;
}




const AddMemberBenefitModal = ({ onClose, onCreate, categories, editMemberBenefit, onUpdate, loading }: AddMemberBenefitModalProps) => {
    const { t } = useTranslation("dashboard")
    const [step, setStep] = React.useState(1)
    const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: editMemberBenefit ? {
                name: editMemberBenefit.title,
                code: editMemberBenefit.code,
                domain: editMemberBenefit.domain,
                link: editMemberBenefit.link as string,
                location: editMemberBenefit.location as string,
                description: editMemberBenefit.description as string,
                categoryId: editMemberBenefit.categoryId as string,
                imageURL: editMemberBenefit.imageURL as string,
                offer: editMemberBenefit.offer as string,
                visibility: editMemberBenefit.visibility,
                deal_type: "company",
            } : {
                name: '',
                code: '',
                domain: '',
                link: '',
                location: '',
                description: '',
                categoryId: categories[0].id,
                imageURL: '',
                offer: '',
                visibility: MemberBenefitVisibility.PUBLIC,
                deal_type: "company",
                partnership_types: ['ads', 'sponsor']
            }
        }
    )
    const image = watch('imageURL')
    const dealType = watch('deal_type')
    const visiBility = watch('visibility')
    const getVisibility = () => {
        switch (visiBility) {
            case MemberBenefitVisibility.PRIVATE:
                return []
            case MemberBenefitVisibility.PUBLIC:
                return ['public', 'public_other']
            case MemberBenefitVisibility.OWNED_PRIVATE:
                return ['public_other']
            case MemberBenefitVisibility.OWNED_PUBLIC:
                return ['public']
            default:
                return []
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (data: FormValues) => {
        // onTagChange(data as Tag)
        // check if image is uploaded
        console.log(data)
        if (editMemberBenefit) {
            // update
            onUpdate({
                id: editMemberBenefit.id,
                ...data,
            })
            return;
        }
        onCreate(data)
    }
    return (
        <Modal isOpen={true} onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-10 gap-8 '>
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

                {step == 1 && (
                    <div>
                        <div>
                            <Typography type='h1' className='!text-base  font-medium text-black font-satoshi '>Create Deal</Typography>
                            <Typography type='p' className='!text-sm text-[#5E5E5E]'>Publish your private or public deal.</Typography>
                        </div>
                        <div className='py-6'>
                            <Divider />
                        </div>
                        <div>
                            <div>
                                <Typography type='h2' className='!text-base  font-medium text-black '>Deal Type</Typography>
                                <Typography type='p' className='!text-sm text-[#5E5E5E]'>This deal is from your company or are you creating on behalf of a partner?</Typography>
                            </div>
                        </div>
                        <div className='mt-3'>

                            <Controller
                                control={control}
                                name="deal_type"
                                render={({ field: { onChange, value } }) => (
                                    <RadioGroup
                                        id='dealType'
                                        name='dealType'
                                        className=''
                                        options={[
                                            {
                                                label: <div className='flex flex-col gap-1'>
                                                    <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>My Company</Typography>
                                                    <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Checked you can choose who will see your deal.</Typography>
                                                </div>,
                                                value: 'company'
                                            },
                                            {
                                                label:
                                                    <div className='flex flex-col gap-1'>
                                                        <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>My Partner</Typography>
                                                        <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Checked will be visible just for your customers.</Typography>
                                                    </div>, value: 'partner'
                                            }
                                        ]}
                                        onChange={onChange}
                                        value={value}
                                    />
                                )}
                            />
                        </div>

                        {dealType == 'company' && (
                            <>
                                <div className='py-6'>
                                    <Divider />
                                </div>
                                <div>
                                    <div>
                                        <Typography type='h2' className='!text-base  font-medium text-black '>Visibility</Typography>
                                        <Typography type='p' className='!text-sm text-[#5E5E5E]'>With who this deal will be shared with?</Typography>
                                    </div>
                                </div>
                                <div className='mt-3'>

                                    <Controller
                                        control={control}
                                        name="visiblity"
                                        render={({ field: { onChange, value } }) => (
                                            <CheckboxGroup
                                                id='visiblity'
                                                name='visiblity'
                                                className=''
                                                options={[
                                                    {
                                                        label: <div className='flex flex-col gap-1'>
                                                            <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>Show to my customers</Typography>
                                                            <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Unchecked will be hidden for your customers</Typography>
                                                        </div>,
                                                        value: 'public'
                                                    },
                                                    {
                                                        label:
                                                            <div className='flex flex-col gap-1'>
                                                                <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>Show on the marketplace</Typography>
                                                                <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Unchecked will be hidden on the deals marketplace.</Typography>
                                                            </div>, value: 'public_other'
                                                    }
                                                ]}
                                                onChange={(val) => {
                                                    console.log(val)
                                                    if (val.includes('public')) {
                                                        if (val.includes('public_other')) {
                                                            setValue('visibility', MemberBenefitVisibility.PUBLIC)
                                                        }
                                                        else {
                                                            setValue('visibility', MemberBenefitVisibility.OWNED_PUBLIC)
                                                        }
                                                    } else {
                                                        if (val.includes('public_other')) {
                                                            setValue('visibility', MemberBenefitVisibility.OWNED_PRIVATE)
                                                        }
                                                        else {
                                                            setValue('visibility', MemberBenefitVisibility.PRIVATE)
                                                        }
                                                    }
                                                }}
                                                value={getVisibility()}
                                            />
                                        )}
                                    />
                                </div>
                            </>
                        )}
                        {dealType == 'company' && (visiBility == MemberBenefitVisibility.PUBLIC || visiBility == MemberBenefitVisibility.OWNED_PRIVATE) && (
                            <>
                                <div className='py-6'>
                                    <Divider />
                                </div>
                                <div>
                                    <div>
                                        <Typography type='h2' className='!text-base  font-medium text-black '>Types of partnerships</Typography>
                                        <Typography type='p' className='!text-sm text-[#5E5E5E]'>Choose the partnerships are you open to:</Typography>
                                    </div>
                                </div>
                                <div className='mt-3'>

                                    <Controller
                                        control={control}
                                        name="partnership_types"
                                        render={({ field: { onChange, value } }) => (
                                            <CheckboxGroup
                                                id='partnership_types'
                                                name='partnership_types'
                                                className='last:border-t last:border-[#E6E6E6] last:-mt-1 last:pt-1'
                                                options={[
                                                    {
                                                        label: <div className='flex flex-col gap-1'>
                                                            <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>Ads</Typography>
                                                            <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Receive revenue for views and click of this deal on partners dealbook.</Typography>
                                                        </div>,
                                                        value: 'ads'
                                                    },
                                                    {
                                                        label:
                                                            <div className='flex flex-col gap-1'>
                                                                <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>Sponsor</Typography>
                                                                <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Partners on the marketplace can invite you to sponsorship.</Typography>
                                                            </div>,
                                                        value: 'sponsor'
                                                    },
                                                    {
                                                        label:
                                                            <div className='flex flex-col gap-1'>
                                                                <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>Needs approval?</Typography>
                                                                <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Partners need your approval before publishing on their dealbook.</Typography>
                                                            </div>,
                                                        value: 'needs_approval'
                                                    },
                                                ]}
                                                onChange={onChange}
                                                value={(value as string[])}
                                            />
                                        )}
                                    />
                                </div>
                            </>
                        )}

                    </div>
                )}
                {step == 2 && (
                    <div className='flex gap-6 flex-col'>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    label="Name"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder='Enter  Name'
                                    onChange={onChange}
                                    value={value}
                                    error={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    label="Description"
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder='Enter Description'
                                    onChange={onChange}
                                    value={value}
                                    error={errors.description?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="code"
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    label="Code"
                                    type="text"
                                    id="code"
                                    name="code"
                                    placeholder='Enter Code'
                                    onChange={onChange}
                                    value={value}
                                    error={errors.code?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="offer"
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    label="Offer"
                                    type="text"
                                    id="offer"
                                    name="offer"
                                    placeholder='Enter Offer'
                                    onChange={onChange}
                                    value={value as string}
                                    error={errors.offer?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="visibility"
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    label='Visibility'
                                    id='visibility'
                                    name='visibility'
                                    options={_.keys(MemberBenefitVisibility).map(key => ({ value: key, label: t(`memberbenefit.visibility.${key}`) }))}
                                    value={value as string}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="domain"
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    label="Domain"
                                    type="text"
                                    id="domain"
                                    name="domain"
                                    placeholder='Enter domain'
                                    onChange={onChange}
                                    value={value}
                                    error={errors.domain?.message}
                                />
                            )}
                        />
                        <div className='w-fit h-fit'>
                            <ImageUploader onImageUpload={(image) => setValue('imageURL', image)} image={image as string} />
                        </div>
                        <Controller
                            control={control}
                            name="categoryId"
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    label="Category"
                                    id="categoryId"
                                    name="categoryId"
                                    onChange={onChange}
                                    value={value ?? categories[0].id}
                                    error={errors.categoryId?.message}
                                    options={categories.map(category => ({ label: category.name, value: category.id }))}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="link"
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    label="link"
                                    type="text"
                                    id="link"
                                    name="link"
                                    placeholder='Enter link'
                                    onChange={onChange}
                                    value={value as string}
                                    error={errors.link?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="location"
                            render={({ field: { onChange, value } }) => (
                                <InputField
                                    label="location"
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder='Enter location'
                                    onChange={onChange}
                                    value={value as string}
                                    error={errors.location?.message}
                                />
                            )}
                        />
                    </div>
                )}
                <div className='button '>
                    <Button
                        type={step === 1 ? 'button' : 'submit'}
                        onClick={() => {
                            if (step === 1) {
                                setStep(step + 1)
                            }
                        }}
                        label={step === 1 ? "Next" : "Save Deal"}
                        variant='primary'
                        className='w-full'
                    />
                </div>


            </form>
        </Modal >
    )
}

export default AddMemberBenefitModal
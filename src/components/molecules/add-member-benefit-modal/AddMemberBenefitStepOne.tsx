import Button from "@/components/atomic/button/Button";
import CheckboxGroup from "@/components/atomic/checkbox/CheckboxGroup";
import Divider from "@/components/atomic/divider/Divider";
import RadioGroup from "@/components/atomic/radiogroup/radiogroup";
import Typography from "@/components/atomic/typography/Typography";
import { DealType, MemberBenefitVisibility, PartnershipType } from "@/lib/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';

const schema = yup.object().shape({
    deal_type: yup.string().required(),
    partnership_types: yup.array().of(yup.string()).required(),
    visibility: yup.string().required()
})
interface FormValues {
    visibility?: string | undefined;
    deal_type?: string;
    partnership_types?: string[] | null | undefined;
}

interface AddMemberBenefitStepOneProps {
    deal_type: string;
    partnership_types: string[];
    visibility: string;
    onSubmit: (data: FormValues) => void;
}
const AddMemberBenefitStepOne = ({ deal_type, partnership_types, visibility, onSubmit }: AddMemberBenefitStepOneProps) => {
    const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                deal_type: deal_type,
                partnership_types: partnership_types,
                visibility: visibility
            },
        }
    )
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
    const onSubmitForm = (data: FormValues) => {
        onSubmit(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>

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
                                    value: DealType.COMPANY
                                },
                                {
                                    label:
                                        <div className='flex flex-col gap-1'>
                                            <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>My Partner</Typography>
                                            <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Checked will be visible just for your customers.</Typography>
                                        </div>, value: DealType.PARTNER
                                }
                            ]}
                            onChange={onChange}
                            value={value}
                            error={errors.deal_type?.message}
                        />
                    )}
                />
            </div>

            {dealType == DealType.COMPANY && (
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
                                    error={errors.visibility?.message}
                                />
                            )}
                        />
                    </div>
                </>
            )}
            {dealType == DealType.COMPANY && (visiBility == MemberBenefitVisibility.PUBLIC || visiBility == MemberBenefitVisibility.OWNED_PRIVATE) && (
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
                                            value: PartnershipType.ADS
                                        },
                                        {
                                            label:
                                                <div className='flex flex-col gap-1'>
                                                    <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>Sponsor</Typography>
                                                    <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Partners on the marketplace can invite you to sponsorship.</Typography>
                                                </div>,
                                            value: PartnershipType.SPONSOR
                                        },
                                        {
                                            label:
                                                <div className='flex flex-col gap-1'>
                                                    <Typography type='h3' className='font-satoshi text-sm lg:text-sm leading-normal !text-black !font-medium'>Needs approval?</Typography>
                                                    <Typography type='p' className='!text-sm lg:!text-sm font-regular text-[#5E5E5E]'>Partners need your approval before publishing on their dealbook.</Typography>
                                                </div>,
                                            value: PartnershipType.NEEDS_APPROVA
                                        },
                                    ]}
                                    onChange={onChange}
                                    value={(value as string[])}
                                    error={errors.partnership_types?.message}
                                />
                            )}
                        />
                    </div>
                </>
            )}
            <div className='button my-8 '>
                <Button
                    type={'submit'}
                    label={"Next"}
                    variant='primary'
                    className='w-full'
                />
            </div>
        </form>
    )
}

export default AddMemberBenefitStepOne;
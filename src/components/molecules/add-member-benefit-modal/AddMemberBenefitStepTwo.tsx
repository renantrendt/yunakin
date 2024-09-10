import Button from '@/components/atomic/button/Button'
import Divider from '@/components/atomic/divider/Divider'
import Dropdown from '@/components/atomic/dropdown/Dropdown'
import ImageUploader from '@/components/atomic/file-uploader/ImageUploader'
import InputField from '@/components/atomic/input/InputField'
import TextArea from '@/components/atomic/textarea/TextArea'
import Typography from '@/components/atomic/typography/Typography'
import { yupResolver } from '@hookform/resolvers/yup'
import { Category } from '@prisma/client'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
const schema = yup.object().shape({
    title: yup.string().required().max(50, 'Company Name must be less than 50 characters'),
    code: yup.string().optional(),
    domain: yup.string().required().max(50, 'Website must be less than 50 characters'),
    imageURL: yup.string().optional().nullable(),
    offer: yup.string().optional().nullable(),
    location: yup.string().optional().nullable().max(20, 'City must be less than 20 characters'),
    link: yup.string().optional().nullable(),
    description: yup.string().max(150, 'Description must be less than 150 characters').required(),
    imageType: yup.string().optional().nullable()
})
interface FormValues extends yup.Asserts<typeof schema> { }

interface AddMemberBenefitStepTwoProps {
    data: FormValues;
    onSubmit: (data: FormValues) => void;
    onBack: (data: any) => void;
    categories: Category[]
    loading: boolean
}
const AddMemberBenefitStepTwo = ({ data, onSubmit, onBack, categories, loading }: AddMemberBenefitStepTwoProps) => {
    const { handleSubmit, control, watch, setValue, formState: { errors, dirtyFields }, getValues } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                title: data.title,
                code: data.code,
                domain: data.domain,
                imageURL: data.imageURL,
                offer: data.offer,
                location: data.location,
                link: data.link,
                description: data.description,
                imageType: data.imageType
            },
        }
    )
    const image = watch('imageURL')
    const onSubmitForm = (data: FormValues) => {
        onSubmit(data)
    }
    console.log(errors)
    return (
        <form onSubmit={handleSubmit(onSubmitForm)} >
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center text-[#5E5E5E] cursor-pointer rounded-lg hover:bg-gray-100 p-1  w-fit' onClick={() => {
                    const c = Object.keys(dirtyFields).reduce((acc, key) => {

                        const value = getValues(key as any)
                        acc[key] = value
                        return acc
                    }, {} as any)

                    console.log(c)
                    onBack(c)
                }} >
                    <ArrowLeftIcon />
                    <Typography type='p' className='text-[#5E5E5E] text-sm'>Back</Typography>
                </div>
                <div className='flex gap-4 flex-col'>
                    <div className='w-fit h-fit'>
                        <Typography type='h6' className='text-black mb-1 !text-sm'>Company Logo</Typography>
                        <Typography type='p' className='text-[#5E5E5E] !text-xs mb-2'>Insert or change the company logo.</Typography>
                        <ImageUploader onImageUpload={(image, imageType) => {
                            setValue('imageURL', image, { shouldDirty: true })
                            setValue('imageType', imageType, { shouldDirty: true })
                        }
                        } image={image as string}
                            comment='Upload a screenshot of the avatar of Linkedin, Instagram or Company Website' />
                    </div>
                    <Divider dividerStyle={"light"} dividerType={"horizontal"} />
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Company Name"
                                description='Insert the company name.'
                                type="text"
                                id="title"
                                name="title"
                                placeholder='Company Name'
                                maxLength={50}
                                onChange={onChange}
                                value={value}
                                error={errors.title?.message}
                                required
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <TextArea
                                label="Description"
                                id="description"
                                name="description"
                                required
                                description='Insert a brief description of the deal.'
                                placeholder='Enter Description'
                                onChange={onChange}
                                value={value}
                                maxLength={150}
                                showCounter
                                rows={3}
                                error={errors.description?.message}
                            />
                        )}
                    />
                    {/* <Controller
                        control={control}
                        name="categoryId"
                        render={({ field: { onChange, value } }) => (
                            <div className='my-4'>
                                <Dropdown
                                    label="Category"
                                    id="categoryId"
                                    name="categoryId"
                                    onChange={onChange}
                                    value={value ?? categories[0].id}
                                    error={errors.categoryId?.message}
                                    options={categories.map(category => ({ label: category.name, value: category.id }))}
                                />
                            </div>

                        )}
                    /> */}
                    <Controller
                        control={control}
                        name="code"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Deal Code"
                                type="text"
                                id="code"
                                required
                                description='Describe the details on how to redeem the code.'
                                name="code"
                                placeholder='Enter code and instructions on how to redeem'
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
                                description='Insert the offer that will be highlighted on top of the card.'
                                id="offer"
                                name="offer"
                                placeholder='Enter Offer'
                                onChange={onChange}
                                value={value as string}
                                maxLength={23}
                                error={errors.offer?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="domain"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Website"
                                type="text"
                                required
                                id="domain"
                                description='Insert the link of the website or from a custom landing page.'
                                name="domain"
                                placeholder='Enter Website'
                                maxLength={50}
                                onChange={onChange}
                                value={value}
                                error={errors.domain?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="location"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="City"
                                type="text"
                                id="location"
                                name="location"
                                description='If the deal is for a specific location, insert the name of the city.'
                                placeholder='Enter City'
                                maxLength={20}
                                onChange={onChange}
                                value={value as string}
                                error={errors.location?.message}
                            />
                        )}
                    />
                </div>
            </div>
            <div className='button my-8 '>
                <Button
                    loading={loading}
                    type='submit'
                    label={"Save Deal"}
                    variant='primary'
                    className='w-full'
                />
            </div>
        </form>
    )
}

export default AddMemberBenefitStepTwo
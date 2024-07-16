import Button from '@/components/atomic/button/Button'
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
    name: yup.string().required(),
    code: yup.string().required(),
    domain: yup.string().required(),
    imageURL: yup.string().optional().nullable(),
    offer: yup.string().optional().nullable(),
    location: yup.string().optional().nullable(),
    link: yup.string().optional().nullable(),
    description: yup.string(),
    categoryId: yup.string().required(),
})

interface FormValues {
    name: string
    code: string
    domain: string
    imageURL: string
    offer: string
    location: string
    link: string
    description: string
    categoryId: string
}
interface AddMemberBenefitStepTwoProps {
    data: FormValues;
    onSubmit: (data: FormValues) => void;
    onBack: (data: any) => void;
    categories: Category[]
}
const AddMemberBenefitStepTwo = ({ data, onSubmit, onBack, categories }: AddMemberBenefitStepTwoProps) => {
    const { handleSubmit, control, watch, setValue, formState: { errors, dirtyFields }, getValues } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                name: data.name,
                code: data.code,
                domain: data.domain,
                imageURL: data.imageURL,
                offer: data.offer,
                location: data.location,
                link: data.link,
                description: data.description,
                categoryId: data.categoryId,
            },
        }
    )
    const image = watch('imageURL')
    const onSubmitForm = (data: FormValues) => {
        onSubmit(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmitForm)} >

            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center text-[#5E5E5E] cursor-pointer rounded-lg hover:bg-gray-100 p-1  w-fit' onClick={() => {
                    const c = Object.keys(dirtyFields).reduce((acc, key) => {

                        const value = getValues(key as any)
                        acc[key] = value
                        return acc
                    }, {} as any)
                    onBack(c)
                }} >
                    <ArrowLeftIcon />
                    <Typography type='p' className='text-[#5E5E5E] text-sm'>Back</Typography>
                </div>
                <div className='flex gap-4 flex-col'>
                    <div className='w-fit h-fit'>
                        <ImageUploader onImageUpload={(image) => setValue('imageURL', image)} image={image as string} />
                    </div>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Company Name"
                                type="text"
                                id="name"
                                name="name"
                                placeholder='Company Name'
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
                            <TextArea
                                label="Description"
                                id="description"
                                name="description"
                                placeholder='Enter Description'
                                onChange={onChange}
                                value={value}
                                maxLength={150}
                                rows={3}
                                error={errors.description?.message}
                            />
                        )}
                    />
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
                                id="domain"
                                name="domain"
                                placeholder='Enter Website'
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
                                placeholder='Enter City'
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
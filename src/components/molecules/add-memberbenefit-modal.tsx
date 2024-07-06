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
    categoryId: yup.string().required()
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
}

const AddMemberBenefitModal = ({ onClose, onCreate, categories, editMemberBenefit, onUpdate, loading }: AddMemberBenefitModalProps) => {
    const { t } = useTranslation("dashboard")

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
                visibility: editMemberBenefit.visibility
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
                visibility: MemberBenefitVisibility.PRIVATE
            }
        }
    )
    const image = watch('imageURL')
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
                <p className='text-base font-medium leading-6'>{editMemberBenefit ? "Edit Member Benefit" : "Add Member Benefit"}</p>
                <p className='text-sm font-normal leading-5'>Please enter the details for the new member benefit</p>
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

                    <Button type='submit' loading={loading} label={editMemberBenefit ? "Save Changes" : "Save new Member Benefit"} variant='primary' />
                </div>
            </form>
        </Modal>
    )
}

export default AddMemberBenefitModal
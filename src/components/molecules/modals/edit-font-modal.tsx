import Button from '@/components/atomic/button/Button';
import Dropdown from '@/components/atomic/dropdown/Dropdown';
import InputField from '@/components/atomic/input/InputField';
import Modal from '@/components/atomic/modal/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import { MemberBenefitPageConfig } from '@prisma/client';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"


interface EditFontModalProps {
    onClose: () => void;
    onUpdate: (data: FormValues) => void;
    config: MemberBenefitPageConfig;
}

const schema = yup.object().shape({
    priamryFont: yup.string().optional(),
    secondaryFont: yup.string().optional(),
})

interface FormValues {
    primaryFont: string;
    secondaryFont: string;
}

const EditFontModal = ({ onClose, onUpdate, config }: EditFontModalProps) => {

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                primaryFont: config.primaryFont || '',
                secondaryFont: config.secondaryFont || '',
            }
        }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (data: FormValues) => {
        // onTagChange(data as Tag)
        onUpdate(data)
    }

    return (
        <Modal isOpen={true} onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-10 gap-8 '>
                <p className='text-base font-medium leading-6'>Edit Font</p>
                <p className='text-sm font-normal leading-5'>Choose the font combination that match your branding.</p>
                <div className='flex gap-6 flex-col'>
                    <Controller
                        control={control}
                        name="primaryFont"
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                label="Primary Font"
                                id="primaryFont"
                                name="primaryFont"
                                onChange={onChange}
                                value={value}
                                error={errors.primaryFont?.message}
                                options={[{
                                    label: 'Open Sans',
                                    value: 'openSans'
                                }, {
                                    label: 'Roboto',
                                    value: 'robots'
                                }, {
                                    label: 'Poppins',
                                    value: 'poppins'
                                }, {
                                    label: 'Fraunces',
                                    value: 'fraunces'

                                }]}
                            />

                        )}
                    />
                    <Controller
                        control={control}
                        name="secondaryFont"
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                label="Secondary Font"
                                id="secondaryFont"
                                name="secondaryFont"
                                onChange={onChange}
                                value={value}
                                error={errors.secondaryFont?.message}
                                options={[{
                                    label: 'Open Sans',
                                    value: 'openSans'
                                }, {
                                    label: 'Roboto',
                                    value: 'robots'
                                }, {
                                    label: 'Poppins',
                                    value: 'poppins'
                                }, {
                                    label: 'Fraunces',
                                    value: 'fraunces'

                                }]}
                            />

                        )}
                    />

                    <Button type='submit' label={"Save Fonts"} variant='primary' />
                </div>
            </form>
        </Modal>
    )
}

export default EditFontModal
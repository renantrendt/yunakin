import Button from '@/components/atomic/button/Button';
import InputField from '@/components/atomic/input/InputField';
import Modal from '@/components/atomic/modal/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import Dropdown from '../atomic/dropdown/Dropdown';


interface AddMemberBenefitModalProps {
    onClose: () => void;
    onCreate: (data: FormValues) => void;
}

const schema = yup.object().shape({
    name: yup.string().required(),
    code: yup.string().required(),
    domain: yup.string().required(),
    location: yup.string().required(),
    link: yup.string().required(),
    description: yup.string().required(),
})

interface FormValues {
    name: string;
    code: string;
    domain: string;
    location: string;
    link: string;
    description: string;
}

const AddMemberBenefitModal = ({ onClose, onCreate }: AddMemberBenefitModalProps) => {

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                name: '',
                code: '',
                domain: '',
                location: '',
                description: '',
            }
        }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (data: FormValues) => {
        // onTagChange(data as Tag)
        onCreate(data)
    }

    return (
        <Modal isOpen={true} onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-10 gap-8 '>
                <p className='text-base font-medium leading-6'>Add Member Benefit</p>
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
                                value={value}
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
                                value={value}
                                error={errors.location?.message}
                            />
                        )}
                    />

                    <Button type='submit' label={"Save new Member Benefit"} variant='primary' />
                </div>
            </form>
        </Modal>
    )
}

export default AddMemberBenefitModal
import Button from '@/components/atomic/button/Button';
import InputField from '@/components/atomic/input/InputField';
import Modal from '@/components/atomic/modal/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import Dropdown from '../atomic/dropdown/Dropdown';


interface AddCategoryModalProps {
    onClose: () => void;
    onCreate: (data: FormValues) => void;
}

const schema = yup.object().shape({
    name: yup.string().required(),
})

interface FormValues {
    name: string;
}

const AddCategoryModal = ({ onClose, onCreate }: AddCategoryModalProps) => {

    const { handleSubmit, control, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                name: '',
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
                <p className='text-base font-medium leading-6'>Add Category</p>
                <p className='text-sm font-normal leading-5'>Please enter the name for the new category</p>
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
                                placeholder='Enter Category Name'
                                onChange={onChange}
                                value={value}
                                error={errors.name?.message}
                            />
                        )}
                    />

                    <Button type='submit' label={"Save Category"} variant='primary' />
                </div>
            </form>
        </Modal>
    )
}

export default AddCategoryModal
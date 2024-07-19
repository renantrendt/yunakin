import Button from '@/components/atomic/button/Button';
import InputField from '@/components/atomic/input/InputField';
import Modal from '@/components/atomic/modal/Modal';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup"
import Dropdown from '../atomic/dropdown/Dropdown';
import { MemberBenefitPageConfig } from '@prisma/client';


interface CustomizePageModalProps {
    onClose: () => void;
    onUpdate: (data: FormValues) => void;
    config?: MemberBenefitPageConfig;
    loading: boolean;
}


const schema = yup.object().shape({
    backgroundColor: yup.string(),
    textColor: yup.string(),
    buttonColor: yup.string(),
    font: yup.string(),
    slug: yup.string().required(),
})


interface FormValues extends yup.Asserts<typeof schema> { }


const CustomizePageModal = ({ onClose, config, onUpdate, loading }: CustomizePageModalProps) => {


    const { handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormValues>(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                backgroundColor: config?.backgroundColor || '',
                textColor: config?.textColor || '',
                buttonColor: config?.buttonColor || '',
                font: config?.primaryFont || '',
                slug: config?.clientSlug || '',
            }
        }
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onSubmit = (data: FormValues) => {
        onUpdate({
            ...data,
        })
    }

    return (
        <Modal isOpen={true} onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col p-10 gap-8 '>
                <p className='text-base font-medium leading-6'>{"Customize Look"}</p>
                {/* <p className='text-sm font-normal leading-5'>Please enter the details</p> */}
                <div className='flex gap-6 flex-col'>

                    <Controller
                        control={control}
                        name="slug"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Slug"
                                type="text"
                                id="slug"
                                name="slug"
                                placeholder='Enter Domain Name'
                                onChange={onChange}
                                value={value}
                                error={errors.slug?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="backgroundColor"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Background Color"
                                type="color"
                                id="backgroundColor"
                                name="backgroundColor"
                                placeholder='Enter Color'
                                onChange={onChange}
                                value={value}
                                error={errors.backgroundColor?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="textColor"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Text Color"
                                type="color"
                                id="textColor"
                                name="textColor"
                                placeholder='Enter Text Color'
                                onChange={onChange}
                                value={value}
                                error={errors.textColor?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="buttonColor"
                        render={({ field: { onChange, value } }) => (
                            <InputField
                                label="Button Color"
                                type="color"
                                id="buttonColor"
                                name="buttonColor"
                                placeholder='Enter Button Color'
                                onChange={onChange}
                                value={value}
                                error={errors.buttonColor?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="font"
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                label="Font"
                                id="font"
                                name="font"
                                options={[{ value: 'Arial', label: 'Arial' }, { value: 'Roboto', label: 'Roboto' }, { value: 'Open Sans', label: 'Open Sans' }]}
                                onChange={onChange}
                                value={value as string}
                            />
                        )}
                    />
                    <Button type='submit' loading={loading} label={"Save Changes"} variant='primary' />
                </div>
            </form>
        </Modal>
    )
}

export default CustomizePageModal
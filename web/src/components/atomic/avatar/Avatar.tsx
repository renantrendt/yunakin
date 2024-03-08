import Image from 'next/image'
import React from 'react'

interface AvatarProps {
    image: string;
    name: string;

}

const Avatar = ({ image, name }: AvatarProps) => {
    return (
        <div className='avatar'>
            <div className='w-[40px] h-[40px] rounded-full'>
                <Image
                    height={40}
                    width={40}
                    src={image}
                    alt={name}
                    className="object-cover   h-10 w-10  !m-0 !p-0 border-[1px] border-white object-top rounded-full group-hover:scale-105 group-hover:z-30"
                />
            </div>
        </div>
    )
}

export default Avatar
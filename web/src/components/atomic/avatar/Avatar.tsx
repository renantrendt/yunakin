import Image from 'next/image'
import React from 'react'

interface AvatarProps {
    image: string;
    name: string;

}

const Avatar = ({ image, name }: AvatarProps) => {
    return (
        <div className='avatar'>
            <Image
                height={40}
                width={40}
                src={image}
                alt={name}
                className="object-cover  !m-0 !p-0 border-2 border-white object-top rounded-full group-hover:scale-105 group-hover:z-30"
            />
        </div>
    )
}

export default Avatar
import React from 'react'
import EnvelopeIcon from "@/icons/envelope-icon.svg"
import CheckIcon from "@/icons/check-icon.svg"
import WalletIcon from "@/icons/wallet-icon.svg"
import MagnifyingGlassIcon from "@/icons/magnifying-glass.svg";
import ServerIcon from "@/icons/server-icon.svg";
import UserIcon from "@/icons/user-icon.svg";
import PaintIcon from "@/icons/paint-icon.svg"
import Typography from '../atomic/typography/Typography';
interface FeatureListicle {
    id: string
    icon: React.ReactNode
    title: string
    points: string[]
}


const features: FeatureListicle[] = [
    {
        id: "email",
        icon: <EnvelopeIcon />,
        title: "Email",
        points: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Magnam eaque aut est asperiores suscipit debitis doloremque, voluptas impedit rerum aperiam."
        ]
    },
    {
        id: "payments",
        icon: <WalletIcon />,
        title: "Payments",
        points: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Magnam eaque aut est asperiores suscipit debitis doloremque, voluptas impedit rerum aperiam."
        ]
    },
    {
        id: "login",
        icon: <UserIcon />,
        title: "Login",
        points: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Magnam eaque aut est asperiores suscipit debitis doloremque, voluptas impedit rerum aperiam."
        ]
    },
    {
        id: "seo",
        icon: <MagnifyingGlassIcon />,
        title: "SEO",
        points: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Magnam eaque aut est asperiores suscipit debitis doloremque, voluptas impedit rerum aperiam."
        ]
    },
    {
        id: "database",
        icon: <ServerIcon />,
        title: "Database",
        points: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Magnam eaque aut est asperiores suscipit debitis doloremque, voluptas impedit rerum aperiam."
        ]
    },
    {
        id: "design",
        icon: <PaintIcon />,
        title: "Design",
        points: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Magnam eaque aut est asperiores suscipit debitis doloremque, voluptas impedit rerum aperiam."
        ]

    }

]
const FeatureListicle = () => {
    const [selectedFeature, setSelectedFeature] = React.useState(features[0])

    return (
        <section className='my-20  flex flex-col gap-16 lg:gap-24 w-full h-full md:px-0 text-black dark:text-white'>
            <div className='flex flex-col gap-8'>
                <Typography type='h2' className='text-center mb-4'>Supercharge  your app instantly, launch faster, make $</Typography>
                <Typography type='p' className='text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam eaque aut est asperiores suscipit debitis doloremque, voluptas impedit rerum aperiam.</Typography>
            </div>
            <div className='flex gap-4 justify-between'>
                {features.map((feature, index) => (
                    <div key={index} className={`flex hover:cursor-pointer gap-4 flex-col items-center w-16 ${selectedFeature.id == feature.id ? "text-primary-end" : ""}`} onClick={() => setSelectedFeature(feature)}>
                        <div className='icon'>{feature.icon}</div>
                        <div className='flex flex-col gap-4'>
                            <h3>{feature.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className=" w-full py-16 px-4">
                <ul className='flex flex-col gap-4'>
                    {selectedFeature.points.map((point, index) => (
                        <li key={index} className='flex gap-2 p-0'>
                            <div className='bg-green'>
                                <CheckIcon />
                            </div>
                            <span>
                                {point}
                            </span>

                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default FeatureListicle
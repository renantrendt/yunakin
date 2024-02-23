import React from 'react'
import EnvelopeIcon from "@/icons/envelope-icon.svg"
import CheckIcon from "@/icons/check-icon.svg"

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
]
const FeatureListicle = () => {
    const [selectedFeature, setSelectedFeature] = React.useState(features[0])

    return (
        <section className='my-20  flex flex-col gap-16 lg:gap-48 w-full h-full md:px-0 text-black dark:text-white'>
            <div className=''>
                <h2>Supercharge  your app instantly, launch faster, make $</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam eaque aut est asperiores suscipit debitis doloremque, voluptas impedit rerum aperiam.</p>
            </div>
            <div className='emails'>
                {features.map((feature, index) => (
                    <div key={index} className={`flex gap-4 flex-col items-center w-16 ${selectedFeature.id == feature.id ? "text-primary-end" : ""}`} onClick={() => setSelectedFeature(feature)}>
                        <div className='icon'>{feature.icon}</div>
                        <div className='flex flex-col gap-4'>
                            <h3>{feature.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div className="selectedFeature">
                <ul>
                    {selectedFeature.points.map((point, index) => (
                        <li key={index} className='flex gap-2'>
                            <CheckIcon />
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
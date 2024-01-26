import React from 'react'
import FeatureItem from './feature-item'

const features = [
    {
        title: "Fast Editing",
        description: "Lorem ipsum dolor sit amet consectetur. Egestas ac etiam in ac at risus volutpat ultricies aliquet. Pretium tempus pharetra donec sit. In tincidunt neque non pretium. Etiam rhoncus adipiscing felis massa neque vel dui nulla. Semper elementum elit viverra nulla.",
        image: "https://via.placeholder.com/495x420"
    },
    {
        title: "Fast Editing",
        description: "Lorem ipsum dolor sit amet consectetur. Egestas ac etiam in ac at risus volutpat ultricies aliquet. Pretium tempus pharetra donec sit. In tincidunt neque non pretium. Etiam rhoncus adipiscing felis massa neque vel dui nulla. Semper elementum elit viverra nulla.",
        image: "https://via.placeholder.com/495x420",
        direction: "rtl"
    },
    {
        title: "Fast Editing",
        description: "Lorem ipsum dolor sit amet consectetur. Egestas ac etiam in ac at risus volutpat ultricies aliquet. Pretium tempus pharetra donec sit. In tincidunt neque non pretium. Etiam rhoncus adipiscing felis massa neque vel dui nulla. Semper elementum elit viverra nulla.",
        image: "https://via.placeholder.com/495x420"
    },
    {
        title: "Fast Editing",
        description: "Lorem ipsum dolor sit amet consectetur. Egestas ac etiam in ac at risus volutpat ultricies aliquet. Pretium tempus pharetra donec sit. In tincidunt neque non pretium. Etiam rhoncus adipiscing felis massa neque vel dui nulla. Semper elementum elit viverra nulla.",
        image: "https://via.placeholder.com/495x420",
        direction: "rtl"
    }
]
const Features = () => {
    return (

        <section className='my-20  flex flex-col gap-44 w-full px-5 dark:text-white'>
            {features.map((feature, index) => (
                <FeatureItem
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    image={feature.image}
                    direction={feature.direction ?? "ltr"}
                />
            ))}
        </section>
    )
}

export default Features
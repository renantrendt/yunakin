export const blogs = [
    {
        id: 1,
        title: "Blog 1",
        description: "Blog 1 description",
        short_description: "Blog 1 short description",
        publishedAt: "2021-01-01",
        slug: "blog-1",
        imageURL: "https://via.placeholder.com/150",
        category: "category-1",
        author: "fortan-pireva",
    },
]
export const categories = [
    {
        id: 1,
        name: "Category 1",
        slug: "category-1",
        articles: blogs,
    },
    {
        id: 2,
        name: "Category 2",
        slug: "category-2",
        articles: blogs,
    },
]

export const authors = [
    {
        id: 1,
        name: "Author 1",
        avatar: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        name: "Author 2",
        avatar: "https://via.placeholder.com/150",
    },
]


export const categoryPosts(slug: string)  {
    return categories.find((category) => category.slug === slug);
}
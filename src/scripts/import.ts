import { prisma } from '../lib/prisma'
import * as  fs from 'fs'
import * as path from 'path'
import * as Paparse from 'papaparse'
(async () => {
    const csv = fs.readFileSync(path.join(__dirname, "../", 'data.csv'), 'utf-8')

    Paparse.parse(csv, {
        header: true,
        complete: async function (results) {
            console.log(results)

            const userId = "60c8a5d3-9941-4ede-8936-e694df6d6340"
            const categories = await prisma.category.findMany()
            const memberBenefits = results.data.map((benefit: any) => {
                return {
                    domain: benefit.domain,
                    code: benefit.code,
                    offer: benefit.offer,
                    userId: userId,
                    title: benefit.title,
                    description: benefit.description,
                    // imageURL: benefit.imageURL,
                    categoryId: getcategoryId(benefit.categoryId, categories)
                }
            })
            await prisma.memberBenefit.createMany({
                data: memberBenefits
            })
        }
    });


})()

function getcategoryId(categoryName: string, categories: any[]) {
    const category = categories.find(category => category.name === categoryName)
    if (!category) {
        console.log("Category not found", categoryName)
    }
    return category?.id
}
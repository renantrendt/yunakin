import { prisma } from "@/lib/prisma";
import { embedAndStoreDocument } from "@/utils/embedAndStoreDocuments";
async function main() {
    const memberBenefits = await prisma.memberBenefit.findMany({

    });



    memberBenefits.forEach(async (memberBenefit: any) => {
        console.log(`Embedding and storing tool: ${memberBenefit.name}`);
        try {
            // Store the embedding in Pinecone
            await embedAndStoreDocument(memberBenefit.id, memberBenefit.description, {
                ...memberBenefit
            });
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Document embedded and stored successfully');
        } catch (error) {
            console.error('Error embedding and storing document:', error);
        }
    })
}

main().catch(console.error);
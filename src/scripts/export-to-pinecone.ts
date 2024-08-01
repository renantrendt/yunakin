import { prisma } from "@/lib/prisma";
import { createEmbeddingAndStore } from "@/utils/embedAndStoreDocuments";
import { MemberBenefit } from "@prisma/client";
async function main() {
    const memberBenefits = await prisma.memberBenefit.findMany({

    });



    memberBenefits.forEach(async (memberBenefit: MemberBenefit) => {
        console.log(`Embedding and storing benefit: ${memberBenefit.title}`);
        try {
            // Store the embedding in Pinecone
            await createEmbeddingAndStore(memberBenefit.id, memberBenefit.description as string, {
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
import { APP_CONSTANTS } from "@/config/app-config";
import openai from "@/lib/openai";
import pc from "@/lib/pinecone";

export async function embedAndStoreDocument(documentId: string, content: string, metadata: Record<string, any>) {
    try {
        // Generate embedding using OpenAI
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: content,
        });
        const embedding = embeddingResponse.data[0].embedding;

        console.log(embedding);
        // Store the embedding in Pinecone
        await pc.index(APP_CONSTANTS.PINECONE_INDEX).upsert([{
            id: documentId,
            values: embedding,
            metadata,
        }]);

        console.log('Document embedded and stored successfully');
    } catch (error) {
        console.error('Error embedding and storing document:', error);
    }
}
export async function embedAndUpdateDocument(documentId: string, content: string, metadata: Record<string, any>) {
    try {
        // Generate embedding using OpenAI
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: content,
        });
        const embedding = embeddingResponse.data[0].embedding;

        console.log(embedding);
        // Store the embedding in Pinecone
        await pc.index(APP_CONSTANTS.PINECONE_INDEX).upsert([{
            id: documentId,
            values: embedding,
            metadata,
        }]);
        console.log('Document embedded and updated successfully');
    } catch (error) {
        console.error('Error embedding and storing document:', error);
    }
}

export async function semanticSearch(query: string) {
    try {
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: query,
        });
        const embedding = embeddingResponse.data[0].embedding;
        const records = await pc.index(APP_CONSTANTS.PINECONE_INDEX).query({
            vector: embedding,
            topK: 5,
            includeValues: true,
            includeMetadata: true
        })
        const matchedIds = records.matches.map(d => d.id);
        console.log(matchedIds);
        return matchedIds;
    } catch (error) {
        console.error('Error searching for documents:', error);
        return [];
    }
}
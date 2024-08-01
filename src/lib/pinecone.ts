import { APP_CONSTANTS } from '@/config/app-config';
import { Pinecone } from '@pinecone-database/pinecone';


const apiKey = process.env.PINECONE_API_KEY;

if (!apiKey) {
    throw new Error('Pinecone API key is missing');
}

const pc = new Pinecone({
    apiKey: apiKey,
});

pc.listIndexes()
    .then((indexes) => {
        if (!indexes.indexes) {
            return false;
        }
        let exists = false;
        indexes.indexes.forEach((index) => {
            if (index.name === APP_CONSTANTS.PINECONE_INDEX) {
                exists = true;
            }
        });
        return exists;
    })
    .then((exists) => {
        if (!exists) {
            pc.createIndex({
                name: APP_CONSTANTS.PINECONE_INDEX,
                dimension: 1536, // Replace with your model dimensions
                metric: 'euclidean', // Replace with your model metric
                spec: {
                    serverless: {
                        cloud: 'aws',
                        region: 'us-east-1'
                    }
                }
            });
        }
    })
    .catch((error) => {
        console.error('Error checking for search index:', error);
    });

export default pc;  // Export the Pinecone instance
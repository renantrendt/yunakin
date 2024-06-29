import { MeiliSearch } from 'meilisearch'

const createClient = async function () {
    if (!process.env.MEILISEARCH_HOST || !process.env.MEILISEARCH_API_KEY) {
        console.log('Meilisearch not configured, using mock client')
        return {
            index: (indexName: string) => {
                return {
                    getRawInfo: async () => {
                        return {
                            primaryKey: 'id'
                        }
                    },
                    updateSearchableAttributes: async (attributes: string[]) => {
                        return
                    },
                    addDocuments: async (documents: any[]) => {
                        return
                    },
                    deleteDocument: async (documentId: string) => {
                        return
                    },
                    search: async (query: string) => {
                        return {
                            hits: []
                        }
                    },
                    updateDocuments: async (documents: any[]) => {
                        return
                    }
                }
            }
        }
    }

    const client = new MeiliSearch({
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_API_KEY,
    })

    try {

        await client.index('users').getRawInfo();
    } catch (error) {
        console.log('users index not found, creating one')
        await client.createIndex('users')
        await client.index('users').updateSearchableAttributes(['name', 'email', 'role']);
    }
    return client;
}



export default createClient;
import { MeiliSearch } from 'meilisearch'

const createClient = async function () {
    if (!process.env.MEILISEARCH_HOST || !process.env.MEILISEARCH_API_KEY) {
        throw new Error('Please provide MEILISEARCH_HOST and MEILISEARCH_API_KEY in .env')
    }

    const client = new MeiliSearch({
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_API_KEY,
    })

    try {
        const usersIndex = await client.index('users').getRawInfo();
    } catch (error) {
        console.log('users index not found, creating one')
        await client.createIndex('users')
        await client.index('users').updateSearchableAttributes(['name', 'email', 'role']);
    }
    return client;
}



export default createClient;
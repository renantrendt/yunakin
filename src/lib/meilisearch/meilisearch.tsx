import { MeiliSearch } from 'meilisearch'

const init = function () {
    if (!process.env.MEILISEARCH_HOST || !process.env.MEILISEARCH_API_KEY) {
        throw new Error('Please provide MEILISEARCH_HOST and MEILISEARCH_API_KEY in .env')
    }

    const client = new MeiliSearch({
        host: process.env.MEILISEARCH_HOST,
        apiKey: process.env.MEILISEARCH_API_KEY,
    })

    const toolsIndex = client.index('users')
    if (!toolsIndex) {
        client.createIndex('users').then(() => {
            client.index('users').updateSearchableAttributes(['name', 'email', 'role']);

        })
    }
    return client;
}

const client = init()



export default client;
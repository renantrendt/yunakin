import { LRUCache } from "lru-cache";

type Options = {
    uniqueTokenPerInterval?: number;
    interval?: number;
};

export default function rateLimit(options?: Options) {
    const tokenCache = new LRUCache({
        max: options?.uniqueTokenPerInterval || 500,
        ttl: options?.interval || 60000,
    });
    return {
        check: (limit: number, token: string) =>
            new Promise<{ limit: number, remaining: number }>((resolve, reject) => {
                const tokenCount = (tokenCache.get(token) as number[]) || [0];
                if (tokenCount[0] === 0) {
                    tokenCache.set(token, tokenCount);
                }
                tokenCount[0] += 1;

                const currentUsage = tokenCount[0];
                const isRateLimited = currentUsage >= limit;
                return isRateLimited ? reject() : resolve({
                    limit: limit,
                    remaining: (isRateLimited ? 0 : limit - currentUsage)
                });
            }),
    };
}
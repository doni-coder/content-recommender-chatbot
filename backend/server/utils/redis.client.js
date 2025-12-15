import { createClient } from "redis"

const redisClient = createClient({ url: "url: 'redis://localhost:6379'" })

export { redisClient }
import { redisClient } from "../utils/redis.client.js"
import { getAuth, clerkClient } from "@clerk/express";

const jobEnqueuer = async (req, res) => {
    try {
        const { isAuthenticated, userId } = getAuth(req)
        if (!isAuthenticated) {
            return res.status(400).json({ message: 'not authenticated' })
        }
        const user = await clerkClient.users.getUser(userId)
        const email = user.emailAddresses[0].emailAddress
        const { socketId, category, platform, query } = req.body
        if (!socketId || !category || !format || !platform || !query || !email) {
            return res.status(400).json({
                message: "credential not provided!"
            })
        }
        await redisClient.connect()
            .then(() => {
                console.log("redis connected")
            })
            .catch((err) => console.log(err.message))

        const job = {
            email: email,
            socketId: socketId,
            category: category,
            platform: platform,
            query: query
        }

        await redisClient.lPush("jobQueue", JSON.stringify(job))

        return res.status(200).json({
            message: "job added to queue"
        })
    } catch (error) {
        console.log("error in jobEnqueuer : ", error.message)
        return res.status(500).json({
            message: "something went wrong"
        })
    }
}

export default jobEnqueuer;
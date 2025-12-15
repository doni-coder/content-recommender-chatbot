import server from "./app/app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const port = 5050 || process.env.PORT


mongoose.connect(`${process.env.MONGODB_URI}`)
    .then(() => {
        console.log("DB connected")
        server.listen(port, () => {
            console.log(`server listening on port http://localhost:${port}`)
        })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error)
        process.exit(1)
    })
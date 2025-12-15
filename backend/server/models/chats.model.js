import { Schema } from "mongoose";

const chatSchema = new Schema({
    receiver: {
        type: Schema.ObjectId,
        ref: 'user'
    },
    chats: [
        {
            source: {
                type: String,
                enum: ["assistant", "user"],
            },
            message: {
                type: String
            }
        }
    ]
})

const Chats = mongoose.model("chats", chatSchema)

export { Chats }
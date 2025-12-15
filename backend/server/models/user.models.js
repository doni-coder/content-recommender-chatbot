import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    chatHistory: [
        {
            title: {
                type: String,
            },
            chatId: {
                type: Schema.ObjectId,
                ref: 'chats'
            },
            neiche:{
                type:String
            }
        }
    ]
})

const User = mongoose.model("user", userSchema)

export { User }
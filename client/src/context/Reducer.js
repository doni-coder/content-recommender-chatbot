import { ToastContainer, toast } from 'react-toastify';

export default function reducer(state, action) {
    switch (action.type) {
        case "setDrawer":
            const newvalue = action.payload
            return {
                ...state,
                isDrawerOpen: newvalue
            }
        case "setChatRecord":
            const newValue = action.payload

            if (!newValue.title || newValue.title.trim() === "") {
                return {
                    ...state,
                    chats: [
                        ...state.chats
                    ],
                    alertMessage: "empty field!"
                }
            }
            const isExist = state.chats?.filter((chat) => chat.title == newValue?.title)
            console.log("isExist:", isExist)
            if (isExist.length > 0) {
                return {
                    ...state,
                    chats: [
                        ...state.chats
                    ],
                    alertMessage: "chat already exist!"
                }
            }
            return {
                ...state,
                chats: [
                    newValue,
                    ...state.chats
                ]
            }
        case "setAlertMessage":
            const alertMsg = action.payload
            return {
                ...state,
                alertMessage: alertMsg
            }

        default:
            break;
    }
}





import { likeComment, likePost, deleteComment, deletePost, editComment, editPost } from "./apiRequest";

export const like = async (isComment, id, value, setMessage, onOpen) => {
    let response;
    if (isComment) {
        try {
            response = await likeComment(localStorage.getItem("tokenLabeddit"), id, value)
            setMessage(response.message)
        } catch (error) {
            console.log(error.response.data)
            setMessage(error.response.data)
        }
    } else {
        try {
            response = await likePost(localStorage.getItem("tokenLabeddit"), id, value)
            setMessage(response.message)
        } catch (error) {
            setMessage(error.response.data)
        }
    }
    onOpen()
}

export const deleteItem = async (isComment, id, setMessage, onOpen) => {
    let response;
    if (isComment) {
        try {
            response = await deleteComment(localStorage.getItem("tokenLabeddit"), id)
            setMessage(response.message)
        } catch (error) {
            console.log(error.response.data)
            setMessage(error.response.data)
        }
    } else {
        try {
            response = await deletePost(localStorage.getItem("tokenLabeddit"), id)
            setMessage(response.message)
        } catch (error) {
            setMessage(error.response.data)
        }
    }
    onOpen()
}

export const editItem = async (isComment, id, newContent, setMessage, onOpen) => {
    let response;
    if (isComment) {
        try {
            response = await editComment(localStorage.getItem("tokenLabeddit"), id, newContent)
            setMessage(response.message)
        } catch (error) {
            console.log(error.response.data)
            setMessage(error.response.data)
        }
    } else {
        try {
            response = await editPost(localStorage.getItem("tokenLabeddit"), id, newContent)
            setMessage(response.message)
        } catch (error) {
            setMessage(error.response.data)
        }
    }
    onOpen()
}
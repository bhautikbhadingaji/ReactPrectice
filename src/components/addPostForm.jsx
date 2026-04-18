import { useState, useEffect, useCallback } from "react"
import { creatPost, editTitlePost, updatePost } from "../axios/axios"
import { useNavigate } from "react-router-dom"


export const Form = ({
    setInputValue,
    updateData,
    setEditedValue,
    updateTitle,
    setUpdateTitle
}) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const navigate = useNavigate();

    let isEmpty = Object.keys(updateData).length === 0
    let updateOnlyTitle = Object.keys(updateTitle).length > 0

    useEffect(() => {
        if (Object.keys(updateData).length > 0) {
            setTitle(updateData.title)
            setBody(updateData.body)

        }
    }, [updateData])

    useEffect(() => {
        if (Object.keys(updateTitle).length > 0) {
            setTitle(updateTitle.title)
        }
    }, [updateTitle])


    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        if (isEmpty && Object.keys(updateTitle).length === 0) {
            if (!title || !body) return
            const res = await creatPost({ title, body, userId: 1 })
            setInputValue(res.data)

        }
        else if (updateOnlyTitle) {
            if (!title) return
            const res = await editTitlePost(updateTitle.id, { title, id: updateTitle.id })
            setEditedValue(res.data)
            setUpdateTitle({})
        }
        else {
            if (!title || !body) return
            const res = await updatePost(updateData.id, { title, body, userId: 1, id: updateData.id })
            setEditedValue(res.data)
        }
        setTitle("")
        setBody("")
        navigate("/")
    }, [
        title, body, updateTitle, updateData, isEmpty, updateOnlyTitle, setInputValue, setEditedValue, setUpdateTitle
    ]);

    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full max-w-md p-4 ">
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    placeholder="Add Title"
                    className="border p-2 rounded" />

                <input value={body}
                    onChange={e => setBody(e.target.value)}
                    type="text"
                    placeholder="Add Description"
                    className="border p-2 rounded"
                    disabled={updateOnlyTitle}
                />
                <button
                    type="submit"
                    value={isEmpty ? "ADD" : "EDIT"}
                    className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
                    {updateOnlyTitle || updateData ? "EDIT" : "ADD"}
                </button>
            </form>
        </div>
    )
}
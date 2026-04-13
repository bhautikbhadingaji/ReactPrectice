import { useState, useMemo } from "react";
import { Form } from "./addPostForm";
import { AllPosts } from "./allPosts";
import { SimpleCard } from "./dataCard";
import { Navbar } from "./navbar";

export const AllPostPerents = () => {
    const [inputValue, setInputValue] = useState({});
    const [updateData, setUpdateData] = useState({});
    const [editedValue, setEditedValue] = useState({}); //editPost
    const [updateTitle, setUpdateTitle] = useState({}); //updateTitle
    const [deletePost, setDeletePost] = useState({}) //delete
    const [loading, setLoading] = useState(false); //loading


    const allPostsMemo = useMemo(() => ({
        inputValue,
        updateData,
        setUpdateData,
        editedValue,
        setUpdateTitle,
        updateTitle,
        setDeletePost,
        deletePost,
        loading,
        setLoading
    }), [
        inputValue,
        updateData,
        editedValue,
        updateTitle,
        deletePost,
        loading
    ]);

    return (
        <>
            <Navbar />
            <Form setInputValue={setInputValue} updateData={updateData} setEditedValue={setEditedValue} updateTitle={updateTitle} setUpdateTitle={setUpdateTitle} />
            <AllPosts {...allPostsMemo} />
            <SimpleCard post={null} updateData={updateData} setUpdateData={setUpdateData} setUpdateTitle={setUpdateTitle} updateTitle={updateTitle} setDeletePost={setDeletePost} deletePost={deletePost} />
        </>
    )
}
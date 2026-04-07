import { useState, useEffect } from "react";
import { Form } from "./addPostForm";
import { AllPosts } from "./allPosts";
import { SimpleCard } from "./dataCard";

export const AllPostPerents = () => {
    const [inputValue, setInputValue] = useState({}); 
    const [updateData, setUpdateData] = useState({}); 
    const [editedValue, setEditedValue] = useState({}); //editPost
    const [updateTitle, setUpdateTitle] = useState({}); //updateTitle
    const [deletePost, setDeletePost] = useState({}) //delete
    const [loading, setLoading] = useState(false); //loading


    return (
        <>
            <Form setInputValue={setInputValue} updateData={updateData} setEditedValue={setEditedValue} updateTitle={updateTitle} setUpdateTitle={setUpdateTitle} />
            <AllPosts inputValue={inputValue} updateData={updateData} setUpdateData={setUpdateData} editedValue={editedValue} setUpdateTitle={setUpdateTitle} updateTitle={updateTitle} setDeletePost={setDeletePost} deletePost={deletePost} loading={loading} setLoading={setLoading} />
            <SimpleCard post={null} updateData={updateData} setUpdateData={setUpdateData} setUpdateTitle={setUpdateTitle} updateTitle={updateTitle} setDeletePost={setDeletePost} deletePost={deletePost} />
        </>
    )
}
import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",

})

export const getPost = () => {      //get api
    return api.get("/posts?_limit=2")
}

export const getFilteredPost = (filterPost) => {  //filter post api
    return api.get(`/posts?title=${filterPost}`)
}
export const getsearchedPost = (searchValue) => {  //filter post api
    return api.get(`/posts?title=${searchValue}`)
}

export const getComments = (id) => {            // getsearched api
    return api.get(`/posts/${id}/comments`)
}

export const getCardDetails = (id) => {      //get cardDetails api
    return api.get(`/posts/${id}`)
}

export const creatPost = (post) => {     //creat api
    return api.post("/posts", post)
}

export const updatePost = (id, post) => {   //edit api
    return api.put(`/posts/${id}`, post)
}

export const editTitlePost = (id, post) => {  //update title api
    return api.patch(`/posts/${id}`, post)
}

export const deletePost = (id) => {             //delete api
    return api.delete(`/posts/${id}`)
}
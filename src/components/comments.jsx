import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getComments } from "../axios/axios"
import { useFetch } from "../Hooks/useFetch"


export const CommentPost = () => {

    const { id } = useParams()
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false);


    const [data] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

    useEffect(()=>{
        setLoading(true)
        if(data){
            setComments(data)
        }
        setLoading(false)
    })

    //  useEffect(() => {
    //     setLoading(true)
    //     getComments(id)
    //       .then((res) => {
    //         setComments(res.data)   
    //         setLoading(false)
    //       })
    //       .catch((err) => {
    //         console.error("Fetch posts failed", err)
    //         setLoading(false)
    //       })
    
    //   }, [id])

    if (loading) return <p>Loading...</p>;
    if (!comments) return <p>No data available</p>;

    return (
        <>
            <div className="flex flex-wrap gap-10 mt-12 ml-24">
                {comments.map(comment =>
                    <div key={comment.id} className="w-full bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">

                        <p>Name: {comment.name}</p>
                        <br />
                        <p>Email: {comment.email}</p>
                        <br />
                        <p>Body: {comment.body}</p>
                    </div>
                )}
                <div className="mt-8">
                    <NavLink
                        to="/"
                    >
                        ← Back
                    </NavLink>
                </div>
            </div>
        </>
    )
}
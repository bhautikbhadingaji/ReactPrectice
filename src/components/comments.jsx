import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { getFilteredComments } from "../axios/axios"
import { useFetch } from "../Hooks/useFetch"


export const CommentPost = () => {

    const { id } = useParams()
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false);

    const [FilterComments, setFilterComments] = useState([])

    console.log("FilterComments", FilterComments)

    const [data] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

    useEffect(() => {
        setLoading(true)
        if (data) {
            setComments(data)
        }
        setLoading(false)
    },[data])

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

    // filter for Comments

    const handleFilterComments = async () => {
        try {
            const res = await getFilteredComments(id, FilterComments);
            setComments(res.data);
            console.log("res==>", res.data)
        } catch (error) {
            console.error("Fetch posts failed", err);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (!comments) return <p>No data available</p>;

    return (
        <>
            <div>

                <input className="border p-2 rounded mt-5"
                    type="text"
                    placeholder="search By Email"
                    value={FilterComments}
                    onChange={(e) => setFilterComments(e.target.value)}
                />

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={handleFilterComments}
                >Filter</button>

            </div>
            <div className="flex flex-wrap gap-10 mt-12 ml-24 mb-10">

                {comments.map(comment =>
                    <div key={comment.id} className="w-full bg-yellow-100 text-black block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">

                        <p>Name: {comment.name}</p>
                        <br />
                        <p>Email: {comment.email}</p>
                        <br />
                        <p>Body: {comment.body}</p>
                    </div>
                )}

            </div>
           
            <div className="ml-220 mb-8 mr-3 fixed bottom-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                <NavLink
                    to="/"
                >
                    ← Back
                </NavLink>
            </div>
        
        </>
    )
}
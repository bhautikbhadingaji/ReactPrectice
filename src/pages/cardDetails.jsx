import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
// import { getCardDetails } from "../axios/axios";
import { useFetch } from "../Hooks/useFetch";


export const CardDetails = () => {

  const { id } = useParams();
  const [post, setPost] = useState([]);

  const [data] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  console.log("datadata", data)

  useEffect(() => {
    if (data) {
      setPost(data)
    }
  })

  // useEffect(() => {
  //   getCardDetails(id)
  //     .then((res) => {
  //       setPost(res.data)
  //     })
  //     .catch((err) => {
  //       console.error("Fetch posts failed", err)

  //     })
  // }, [])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full text-center">

        <h1 className="mb-6 text-gray-800">
          Card Details - {id}
        </h1>

        <div className="py-6">
          <h3 className="text-white-900 mb-4">
            Title: {post.title}
          </h3>

          <p className="text-gray-600">
            Body: {post.body}
          </p>
        </div>

        <div className="mt-8">
          <NavLink
            to="/"
          >
            ← Back
          </NavLink>
        </div>

      </div>
    </div>
  )
}

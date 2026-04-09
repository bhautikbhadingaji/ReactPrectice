import { useCallback, useEffect, useState } from "react"
import "../App.css"
import { SimpleCard } from "./dataCard.jsx"
import { getFilteredPost, getsearchedPost, getUsers, getUsersPost } from "../axios/axios.jsx"
import { useFetch } from "../Hooks/useFetch.jsx"



export const AllPosts = (
  {
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
  }
) => {


  const [posts, setPosts] = useState([])
  const [filterPost, setFilterPost] = useState([])       //filter state
  const [searchValue, setSearchValue] = useState([])    //search state 


  const [itemsPerPage, setitemsPerPage] = useState(5)    //item par page state
  const [currentPage, setCurrentPage] = useState(1)     //pagination state

  const [users, setUsers] = useState([])                //get users state
  // const [selectedUser, setSelectedUser] = useState("") //seleted user in dropDown state
  
  const [data] = useFetch(`https://jsonplaceholder.typicode.com/posts`)

  useEffect(() => {
    if (data) {
      setPosts(data)
    }
  }, [data])


  if (Object.keys(inputValue).length > 0) {

    posts.unshift(inputValue);
  }


  posts.forEach((element) => {
    if (element.id === editedValue.id) {
      element.title = editedValue.title;
      element.body = editedValue.body
    }

  }
  );

  posts.forEach((prevData) => {
    if (prevData.id === editedValue.id) {
      prevData.title = editedValue.title;
    }
  }
  );

  let index = posts.findIndex(function (element) {
    return element.id === deletePost.id
  });

  if (index > -1) {
    posts.splice(index, 1);
  }

  // filter logic

  const handleFilterPost = async () => {
    try {
      setLoading(true);
      const res = await getFilteredPost(filterPost);
      setPosts(res.data);
    } catch (err) {
      console.error("Fetch posts failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchPost = async () => {
    try {
      setLoading(true);
      const res = await getsearchedPost(searchValue);
      setPosts(res.data);
    } catch (err) {
      console.error("Fetch posts failed", err);
    } finally {
      setLoading(false);
    }
  }

  // pagination

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex - itemsPerPage;

  const currentItems = posts.slice(endIndex, startIndex);

  const handleItemPerPage = async () => {
    // try {
    //   setLoading(true)
    //   const res = await getLimitForPage(currentPage,itemsPerPage);
    //   setitemsPerPage(res.data)
    // } catch (err) {
    //   console.error("fetch posts faild",err);
    // }finally{
    //   setLoading(false)
    // }
  }

  const totalPages = Math.ceil(posts.length / itemsPerPage);


  const handlePrevBtn = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  },[
    currentPage
  ])

  const handleNextBtn = useCallback( () => {

    if (currentPage < totalPages) {

      setCurrentPage((prev) => prev + 1)
    } else {
      console.log("can't go next")
    }
  },[
    currentPage,totalPages
  ])


  // get users in dropdown

  useEffect(() => {
    const getUsersFunction = async () => {

      const res = await getUsers();
      setUsers(res.data);
    }
    getUsersFunction()
  }, [])

  const handleSeletedUser = useCallback( async(e) => {
     try {
      // setSelectedUser(e.target.value)
      setLoading(true);
      const res = await getUsersPost(e.target.value);
      setPosts(res.data);
    } catch (err) {
      console.error("Fetch posts failed", err);
    } finally {
      setLoading(false);
    }
  },[])

  // const handleUsers = async() => {
  //    try {
  //               const res = await getUsers();
  //               setUsers(res.data);
  //           } catch (error) {
  //               console.error("Fetch posts failed", err);
  //           }finally{
  //               setLoading(false)
  //           }
  // }


  if (loading) return <p>Loading...</p>;

  return (
    <ul className="max-w">
      <div>
        <input className="border p-2 rounded"
          type="text"
          placeholder="search By Title"
          value={filterPost}
          onChange={(e) => setFilterPost(e.target.value)}
        />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2"
          onClick={handleFilterPost}
        >Filter</button>

        <input className="border p-2 rounded ml-20"
          type="text"
          placeholder="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer ml-2"
          onClick={handleSearchPost}
        >search</button>
      </div>

      <div>
        <select className="inline-flex justify-center gap-x-1.5 border p-2 rounded bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20 mt-5"
         onChange={handleSeletedUser}
        >
          {users?.map(item =>
            <option key={item.id} value={item.id}>{item.name} - {item.id}</option>
          )}
        </select>
      </div>

      <div className="flex flex-wrap gap-4 justify-center p-4">


        {currentItems?.map((post, index) => (
          <SimpleCard
            key={index}
            post={post}
            updateData={updateData}
            setUpdateData={setUpdateData}
            setUpdateTitle={setUpdateTitle}
            updateTitle={updateTitle}
            setDeletePost={setDeletePost}
            deletePost={deletePost}
            loading={loading}
            setLoading={setLoading}
          />

        ))}

      </div>

      <div className="sticky bottom-0 bg-gray-800">

        <select className="inline-flex justify-center gap-x-1.5 border p-2 rounded bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20"
          value={itemsPerPage} onChange={(e) => setitemsPerPage(e.target.value)} onClick={handleItemPerPage}>
          <option>Select Posts Page</option>
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer ml-150"
          onClick={handlePrevBtn}
          disabled={currentPage === 1}>
          Prev
        </button>

        <button className="ml-2 mr-2 rounded cursor-not-allowed bg-white font-bold py-1 px-2"
        >
          {currentPage}
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
          onClick={handleNextBtn}
        >

          Next
        </button>
      </div>

    </ul>
  )
}


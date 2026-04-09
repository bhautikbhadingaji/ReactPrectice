import { NavLink } from "react-router-dom"
import { FaRegEdit } from "react-icons/fa";
import { deletePost } from "../axios/axios";
import { useCallback } from "react";

export function SimpleCard(
	{
		post,
		updateData,
		setUpdateData,
		setUpdateTitle,
		updateTitle,
		setDeletePost
	}) {

	if (post === null) {
		return;
	}
	const { title, body, id } = post

	const handleEditPost = useCallback((id, title, body) => {
		try {
			setUpdateData({ id, title, body })

		} catch (error) {
			console.log(error)
		}
	}, [
		id, title, body
	])

	const handleChangeTitle = useCallback((id, title) => {
		try {

			setUpdateTitle({ id, title })
		} catch (error) {
			console.log(error)
		}
	}, [
		id, title, setUpdateTitle
	])

	const handleDeletePost = useCallback(async (id) => {
		try {
			let confirmation = confirm("Want to delete?");

			const res = await deletePost(id)
			setDeletePost({ id })
		} catch (error) {
			console.log(error)
		}
	}, [
		id, deletePost, setDeletePost
	])

	return (

		<div className="max-w-sm bg-green-200 rounded-lg shadow-md overflow-hidden mt-6 inline-flex">
			<div className="p-6">
				<h3 className="text-2xl font-bold text-gray-900 mb-3">
					Title:{title.substring(0, 12) + ' ...'}
					<FaRegEdit className="cursor-pointer inline-block ml-3"
						onClick={() => handleChangeTitle(id, title)}
					/>
				</h3>
				<p className="text-gray-600 text-base mb-4">
					Body:{body.substring(0, 100) + ' ...'}
				</p>
				<div className="text-blue-500 hover:text-blue-700">
					<NavLink to={`/posts/${id}`}>
						Read More
					</NavLink>
				</div>
				<br />
				<div className="grid grid-cols-3 gap-4">
					<button
						onClick={() => handleEditPost(id, title, body)}
						className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded cursor-pointer mt-7">
						EDIT
					</button>

					<button
						onClick={() => handleDeletePost(id)}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-7  ">
						DELETE
					</button>
					<NavLink to={`/posts/${id}/comments`}>
						<button
							className="bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-7 mr-7"
						>
							Comments
						</button>
					</NavLink>
				</div>

			</div>
		</div>

	)
}
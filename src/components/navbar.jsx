import { NavLink } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="flex justify-between item-center bg-gray-900 text-white px-6 py-4 shadow-md">
            <h2 className="text-2xl font-bold tracking-wide">MyPost</h2>
            <ul className="flex gap-6 text-lg">
                <li className="cursor-pointer hover:text-teal-400 ">
                    <NavLink>Home</NavLink>
                </li>
                <li className="cursor-pointer hover:text-teal-400 ">
                    <NavLink to="/add-post">
                        Add Post
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
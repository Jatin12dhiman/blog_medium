import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    const token = localStorage.getItem("token");

    return (
        <div className="border-b border-slate-200 flex justify-between px-10 py-4">
            <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                Medium
            </Link>
            <div>
                {token ? (
                    <>
                        <Link to={`/publish`}>
                            <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New
                            </button>
                        </Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="mr-4 text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                            Logout
                        </button>
                        <Avatar
                            name="harkirat"
                            size={"big"}
                        />
                    </>
                ) : (
                    <>
                        <Link to={'/signin'}>
                            <button
                                type="button"
                                className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Signin
                            </button>
                        </Link>
                        <Link to={'/signup'}>
                            <button
                                type="button"
                                className="mr-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Signup
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
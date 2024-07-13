import { useContext } from "react";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserContext } from "./context/userContext";

const Navbar = () => {
    const { logout } = useContext(UserContext);
    return ( 
        <>
        {/* Navigation Bar */}
        <nav className="flex justify-between p-7 bg-gray-800 text-white">
            <h1 className="text-3xl font-bold">Password Manager</h1>
            {/* Icons */}
            <aside className="flex justify-between items-center w-[40%]">
                <Link to="/">Home</Link>
                <Link to="/password-generator">Password Generator</Link>
                <img src="https://via.placeholder.com/150" alt="User Avatar" className="rounded-full h-10"/>

            <div className="flex h-10 bg-cyan-500 px-3 self-end rounded-md">
                    <button className="m-auto" onClick={logout}>
                        Logout
                    </button>
                    <IoIosLogOut size={30} className="m-auto px-1" />
            </div>
            </aside>
        </nav>
        
        </>
     );
}
 

export default Navbar;
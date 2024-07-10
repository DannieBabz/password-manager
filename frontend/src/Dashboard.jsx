import { IoIosLogOut } from "react-icons/io";
import { UserContext } from "./context/userContext"
import { useContext } from "react"

const Dashboard = () => {


    const { user, logout }  = useContext(UserContext)
    // console.log(user.name)

    return ( 
        <>
        <div className="flex justify-between my-10 px-10">
            { user ? (
            <div>
                <img src="https://via.placeholder.com/150" alt="User Avatar" />
                <h2>Welcome to your Dashboard {user.name}</h2>
                <p>This is where you can manage your passwords and view your activity.</p>
            </div> ): (
            <div>
                <h2>You aren&apos;t logged in yet</h2>
                <p>Please log in to access your dashboard.</p>
            </div>
            )
            
        }
        {user && (
                <div className="flex h-10 bg-cyan-500 px-3 rounded-md">
                    <button className="m-auto" onClick={logout}>
                        Logout
                    </button>
                    <IoIosLogOut size={30} className="m-auto px-1" />
                </div>
            )}
    
        </div>
        </>
     );
    }
 
export default Dashboard;
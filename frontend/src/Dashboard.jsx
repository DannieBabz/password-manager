import { UserContext } from "./context/userContext"
import { useContext } from "react"
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {

// Context
    const { user }  = useContext(UserContext)
    // console.log(user.name)

    return ( 
        <>

        {/* Dashboard */}
        <div className="flex flex-col-reverse justify-between">
            { user ? (
            <div className="my-10">
                <aside className="my-20 mx-10 w-[50%]">
                    <h2>Welcome to your Dashboard {user.name}</h2>
                    <p>This is where you can manage your passwords and view your activity.</p>
                </aside>
            </div> ): (
            <div className="flex flex-col m-auto h-screen relative items-center justify-center">
                <h2>You aren&apos;t logged in yet</h2>
                <p>Please log in to access your dashboard.</p>
                <Link to="/login" className="bg-cyan-500 text-center px-4 py-1 rounded-md">Log In</Link>
            </div>
            )
            
        }
        {user && (
            <Navbar />
            )}
    
        </div>
        </>
     );
    }
 
export default Dashboard;


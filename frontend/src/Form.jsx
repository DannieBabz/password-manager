import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast"
import { useState } from "react";
import axios from "axios";
import { UserContext } from "./context/userContext";
import { useContext } from "react";


const Form = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const { login } = useContext(UserContext);

    const navigate = useNavigate();

    // Handles what happens when the user logs in

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = data
        await login(email, password);

        // Data fetch from server for authentication

        axios.post('http://localhost:3001/login', { email, password })
        .then(res => {
            if(res.data == "Success"){
                console.log(res)
                toast.success("Log in Successful")

                navigate("/dashboard");
            } else{
                setData({email: "", password: ""})
                toast.error("User does not exist")
            }
        })
        .catch(err => {
            console.log(err)
            toast.error("Oops! An error has occured")
    })
    }

    return ( 
        <>
            <div className="flex m-auto h-screen relative items-center justify-center">
                <div className="border rounded-lg drop-shadow-2xl shadow-2xl">
                
                <form onSubmit={handleSubmit} className="flex flex-col p-5">
                <h1 className="text-center text-3xl font-bold">Sign In</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" placeholder="Email" className="px-3 py-2 border rounded-3xl focus:outline-cyan-600 duration-500 bg-transparent" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}/>
                    <label htmlFor="password">Password:</label>
                    <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="px-3 py-2 border rounded-3xl focus:outline-cyan-600 duration-500 bg-transparent"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    <input type="submit" value="Sign In" className="p-2 my-5 border rounded-3xl hover:bg-transparent hover:border-cyan-600 duration-500 bg-cyan-600"/>
                    <p>Don&apos;t have an account? <Link to="/signup" className="text-blue-600 underline">Sign Up</Link></p>
                    <div className="flex my-5">
                        <span className="self-center mx-2 h-[1px] w-40 bg-slate-600"></span>
                        <h1>Or</h1>
                        <span className="self-center mx-2 h-[1px] w-40 bg-slate-600"></span>
                    </div>
                    <div className="flex">
                        <FcGoogle className="self-center mx-auto h-10 w-10"/>
                        <FaSquareXTwitter className="self-center mx-auto h-10 w-10"/>
                        <FaFacebook className="self-center mx-auto h-10 w-10 text-blue-800"/>
                    </div>
                </form>
                </div>

            </div>
        </>
     );
}
 
export default Form;
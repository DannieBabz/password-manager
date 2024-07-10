import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });
    // const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const { name, email, password } = data;
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(res => {
                console.log(res);
                navigate("/login");
                toast.success("Sign up Successful");
            })
            .catch(err => {
                console.log(err);
                toast.error("Sign up Failed");
            });
    };

    return (
        <>
            <div className="flex m-auto h-screen relative items-center justify-center">
                <div className="border rounded-lg drop-shadow-2xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col p-5">
                        <h1 className="text-center text-3xl font-bold">Sign Up</h1>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className="px-3 py-2 border rounded-3xl focus:outline-cyan-600 duration-500 bg-transparent"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="px-3 py-2 border rounded-3xl focus:outline-cyan-600 duration-500 bg-transparent"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="px-3 py-2 border rounded-3xl focus:outline-cyan-600 duration-500 bg-transparent"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        {/* <label htmlFor="password">Confirm Password:</label>
                        <input type="password" placeholder="Confirm Password" name="confirmpassword" className="px-3 py-2 border rounded-3xl focus:outline-cyan-600 duration-500 bg-transparent" onChange={(e) => setConfirmPassword(e.target.value)}/> */}
                        <input type="submit" value="Sign In" className="p-2 my-5 border rounded-3xl hover:bg-transparent hover:border-cyan-600 duration-500 bg-cyan-600"/>
                        <p>Have an account? <Link to="/login" className="text-blue-600 underline">Log In</Link></p>
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

export default Signup;

import axios from "axios";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
import { serverUrl } from "../App";

function SignIn() {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";

    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email,
                password,
            }, { withCredentials: true })

            console.log(result);
        } catch (error) {
            console.log("Error in handleSignIn:", error)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: bgColor }}
        >
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-lg p-8 border-[1px]`} style={{
                border: `1px solid ${borderColor}`
            }} >
                <h1 className={`text-3xl font-bold mb-2 text-[${primaryColor}]`} style={{color: primaryColor}}>FOODIE</h1>
                <p className="text-gray-600 mb-6">Sign In to your account to get started with delicious food deliveries</p>

                {/* email */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Email</label>
                    <input placeholder="Enter Your Email" type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                {/* password */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Password</label>
                    <div className="relative">
                        <input placeholder="Enter Your Password" type={`${showPassword?"password":"text"}`} className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer absolute right-3 top-3 text-gray-500">{!showPassword?<FaRegEye />:<FaRegEyeSlash />}</button>
                    </div>
                </div>

                <div className="text-right mb-4 text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/forgot-password")}>
                    Forgot Password
                </div>

                <button className = {`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignIn}>
                    Sign In
                </button>

                <div className="flex items-center my-5">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div> 

                <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer">
                    <FcGoogle size={20} />
                    <span>Sign in with Google</span>
                </button>

                <p className="text-center mt-5">Want to create a new account ? <span className="text-blue-700 hover:text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/signup")}>SignUp</span></p>

            </div>
        </div>
    );
}

export default SignIn;

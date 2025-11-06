import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"

function SignUp() {
    const primaryColor = "#ff4d2d";
    const hoverColor = "#e64323";
    const bgColor = "#fff9f6";
    const borderColor = "#ddd";

    const [showPassword, setShowPassword] = useState(false)

    const [role, setRole] = useState("user")

    const navigate = useNavigate()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobile, setMobile] = useState("")

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: bgColor }}
        >
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-lg p-8 border-[1px]`} style={{
                border: `1px solid ${borderColor}`
            }} >
                <h1 className={`text-3xl font-bold mb-2 text-[${primaryColor}]`} style={{color: primaryColor}}>FOODIE</h1>
                <p className="text-gray-600 mb-6">Create your account to get started with delicious food deliveries</p>

                {/* fullname */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Full Name</label>
                    <input placeholder="Enter Your Full Name" type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setFullName(e.target.value)} value={fullName} />
                </div>

                {/* email */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Email</label>
                    <input placeholder="Enter Your Email" type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                {/* mobile */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Mobile</label>
                    <input placeholder="Enter Your Mobile No." type="number" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setMobile(e.target.value)} value={mobile} />
                </div>

                {/* password */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Password</label>
                    <div className="relative">
                        <input placeholder="Enter Your Password" type={`${showPassword?"password":"text"}`} className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer absolute right-3 top-3 text-gray-500">{!showPassword?<FaRegEye />:<FaRegEyeSlash />}</button>
                    </div>
                </div>

                {/* role */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="role">Role</label>
                    <div className="flex gap-2">
                        {["user", "owner", "deliveryboy"].map((r) => (
                            <button className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                            onClick={() => setRole(r)}
                            style={
                                role==r ?
                                { backgroundColor: primaryColor, color: "white" } :
                                { border: `1px solid ${primaryColor}`, color: primaryColor }
                            }>{r}</button>
                        ))}
                    </div>
                </div>

                <button className = {`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}>
                    Sign Up
                </button>

                <div className="flex items-center my-5">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div> 

                <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-200 hover:bg-gray-100 cursor-pointer">
                    <FcGoogle size={20} />
                    <span>Sign up with Google</span>
                </button>

                <p className="text-center mt-5">Already have an account ? <span className="text-blue-700 hover:text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/signin")}>SignIn</span></p>

            </div>
        </div>
    );
}

export default SignUp;

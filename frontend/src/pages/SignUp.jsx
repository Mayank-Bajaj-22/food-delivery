import axios from "axios";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

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

    const handleSignUp = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullName,
                email,
                mobile,
                password,
                role,
            }, { withCredentials: true })

            console.log(result);
        } catch (error) {
            console.log(error)
        }
    }

    const handleGoogleAuth = async () => {
        if(!mobile) {
            return alert("Mobile no. is required")
        }
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        console.log(result)

        try {
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role,
                mobile
            }, { withCredentials: true })
        } catch (error) {
            console.log(error)
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
                <p className="text-gray-600 mb-6">Create your account to get started with delicious food deliveries</p>

                {/* fullname */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Full Name</label>
                    <input placeholder="Enter Your Full Name" type="text" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setFullName(e.target.value)} value={fullName} required />
                </div>

                {/* email */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Email</label>
                    <input placeholder="Enter Your Email" type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setEmail(e.target.value)} value={email} required />
                </div>

                {/* mobile */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Mobile</label>
                    <input placeholder="Enter Your Mobile No." type="number" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setMobile(e.target.value)} value={mobile} required />
                </div>

                {/* password */}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Password</label>
                    <div className="relative">
                        <input placeholder="Enter Your Password" type={`${showPassword?"password":"text"}`} className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setPassword(e.target.value)} value={password} required />
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

                <button className = {`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignUp}>
                    Sign Up
                </button>

                <div className="flex items-center my-5">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div> 

                <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer" onClick={handleGoogleAuth}>
                    <FcGoogle size={20} />
                    <span>Sign up with Google</span>
                </button>

                <p className="text-center mt-5">Already have an account ? <span className="text-blue-700 hover:text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/signin")}>SignIn</span></p>

            </div>
        </div>
    );
}

export default SignUp;

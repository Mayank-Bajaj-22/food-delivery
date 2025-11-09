import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"

function ForgotPassword() {

    const borderColor = "#ddd";

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate()

    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4 mb-6'>
                    <IoIosArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/signin")} />
                    <h1 className='text-2xl font-bold text-[#ff4d2d] text-center'>Forgot Password</h1>
                </div>

                {/* steps according - step 1 */}
                {step == 1 
                    && 
                    <div>
                        {/* email */}

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">Email</label>
                            <input placeholder="Enter Your Email" type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setEmail(e.target.value)} value={email} />
                        </div>

                        <button className = {`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}>
                            Send OTP
                        </button>
                    </div>
                }

                {/* steps according - step 2 */}
                {step == 2
                    && 
                    <div>
                        {/* otp */}

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">OTP</label>
                            <input placeholder="Enter OTP" type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setEmail(e.target.value)} value={otp} />
                        </div>

                        <button className = {`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}>
                            Verify OTP
                        </button>
                    </div>
                }

                {/* steps according - step 3 */}
                {step == 3
                    && 
                    <div>
                        {/* otp */}

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="newPassword">New Password</label>
                            <input placeholder="Enter New Password" type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
                            <input placeholder="Enter Confirm Password" type="email" className="w-full border rounded-lg px-3 py-2 focus:outline-none" style={{ border: `1px solid ${borderColor}`}} onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                        </div>

                        <button className = {`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`}>
                            Reset Password
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default ForgotPassword;
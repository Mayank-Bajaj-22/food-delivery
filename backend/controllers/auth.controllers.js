import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js"
import { sendOtpMail } from "../utils/mail.js"

export const signUp = async (req, res) => {
    try {
        // body se yeh data nikal rahe hai
        const { fullName, email, password, mobile, role } = req.body

        // checking user already exist or not   
        let user = await User.findOne({ email })

        if(user) {
            return res.status(400).json({ message: "User already exist."})
        }

        if(password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast of 6 characters."})
        }

        if(mobile.length < 10) {
            return res.status(400).json({ message: "Mobile no. must be atleast of 10 digits."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        user = await User.create({
            fullName, 
            email, 
            role,
            mobile,
            password: hashedPassword  
        })

        // next step genrating tokens

        const token = await genToken(user._id)

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true 
        })

        return res.status(201).json(user)

    } catch (error) {
        return res.status(200).json(`sign up error ${error}`)
    }
}

export const signIn = async (req, res) => {
    try {
        // body se yeh data nikal rahe hai
        const { email, password } = req.body

        // checking user already exist or not   
        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({ message: "User does not exist."})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({ message: "Incorrect Password"})
        }

        // next step genrating tokens

        const token = await genToken(user._id)

        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true 
        })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(200).json(`sign in error ${error}`)
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")

        return res.status(200).json({ message: "log out successfully" })
    } catch (error) {
        return res.status(200).json(`sign out error ${error}`)
    }
}

// example user ne frontend me sign up button pe click kiya, phir vo monogdb me uske according ek user monogodb me banayega or monogodb ek id dega vo json web token ki help se token banayega or vo browser cookies me store karwayenge

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "User does not exist."})
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5*60*1000
        user.isOtpVerified = false

        await user.save()

        await sendOtpMail(email, otp)

        return res.status(200).json({ message: "OTP send succesfully"})
    } catch (error) {
        return res.status(500).json(`send otp error ${error}`)
    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()) {
            return res.status(400).json({ message: "invalid/expired otp"})
        }

        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined

        await user.save()

        return res.status(200).json({ message: "OTP verified succesfully"})
    } catch (error) {
        return res.status(500).json(`verify otp error ${error}`)
    }
}

export const resetPassword = async(req,res) => {
    try {
        const { email, newPassword } = req.body
        const user = await User.findOne({ email });
        if(!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "OTP Verification Required"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.isOtpVerified = false

        await user.save()

        return res.status(200).json({ message: "Password reset succesfully"})

    } catch (error) {
        return res.status(500).json(`reset password error ${error}`)
    }
}
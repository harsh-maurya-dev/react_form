import React, { useEffect, useState } from 'react'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"
import { CiUser } from "react-icons/ci"
import { useForm } from "react-hook-form"
import HobbiesSelection from '../components/HobbiesSelection'
import FileUploader from '../components/FileUploader'
import Location from '../components/Location'

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [hobbies, setHobbies] = useState([]);
    const [location, setLocation] = useState({
        country: null,
        state: null,
        city: null
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const handleHobbiesChange = (newHobbies) => {
        setHobbies(newHobbies);
    };

    const onSubmit = (data) => {
        if (data.password === data.confirmPassword) {
            console.log({
                ...data,
                "hobbies": { ...hobbies }
            })
            const userData = {
                ...data, 
                "hobbies": { ...hobbies }
            }
            localStorage.setItem("User_Details", JSON.stringify(userData))
        } else {
            alert("Passwords do not match")
        }
    }

    return (
        <div className='bg-[#171717] py-6 md:p-10 flex justify-center items-center'>
            <form className="flex flex-col gap-2 md:gap-4 bg-white px-5 py-3 md:p-8 w-10/12 md:w-1/2 shadow-lg h-1/2 rounded-2xl font-sans" onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-gray-800 text-2xl font-semibold text-center'>User Details</h2>

                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-gray-800 font-semibold">Name</label>
                    <div className="flex items-center border border-gray-300 rounded-lg h-12 px-2 focus-within:border-blue-500 transition">
                        <CiUser className="text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Enter your Name"
                            className="ml-2 w-full h-full border-none outline-none rounded-lg"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Name must be at least 3 characters",
                                },
                            })}
                        />
                    </div>
                    {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-gray-800 font-semibold">Email</label>
                    <div className="flex items-center border border-gray-300 rounded-lg h-12 px-2 focus-within:border-blue-500 transition">
                        <AiOutlineMail className="text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Enter your Email"
                            className="ml-2 w-full h-full border-none outline-none rounded-lg"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Please enter a valid email address",
                                },
                            })}
                        />
                    </div>
                    {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
                </div>

                {/* Password */}
                <div className="flex flex-col">
                    <label className="text-gray-800 font-semibold">Password</label>
                    <div className="flex items-center border border-gray-300 rounded-lg h-12 px-2 focus-within:border-blue-500 transition">
                        <AiOutlineLock className="text-gray-400" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your Password"
                            className="ml-2 w-full h-full border-none outline-none rounded-lg"
                            {...register("password", { required: "Password is required" })}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <label className="text-gray-800 font-semibold">Confirm Password</label>
                    <div className="flex items-center border border-gray-300 rounded-lg h-12 px-2 focus-within:border-blue-500 transition">
                        <AiOutlineLock className="text-gray-400" size={20} />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Rewrite your Password"
                            className="ml-2 w-full h-full border-none outline-none rounded-lg"
                            {...register("confirmPassword", { required: "Please confirm your password" })}
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className='text-sm text-red-500'>{errors.confirmPassword.message}</span>}
                </div>

                {/* Location */}
                <Location />
                {/* Categories */}
                <HobbiesSelection onHobbiesChange={handleHobbiesChange} />
                {/* Drag and drop */}
                <FileUploader />

                {/* Terms and Conditions */}
                <div className="flex text-sm flex-col">
                    <div className="flex justify-start gap-2">
                        <input
                            type="checkbox"
                            {...register("termsAndCondition", {
                                required: "You must accept the terms and conditions"
                            })}
                        />
                        <label className="cursor-pointer text-blue-600 hover:underline">
                            Terms and Conditions
                        </label>
                    </div>
                    {errors.termsAndCondition && (
                        <span className='text-sm text-red-500'>{errors.termsAndCondition.message}</span>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    className="mt-4 mb-2 bg-black text-white font-medium rounded-lg h-12 w-full"
                    type="submit"
                >
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUpForm
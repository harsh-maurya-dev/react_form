import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa"
import { CiUser } from "react-icons/ci"
import { useForm } from "react-hook-form"
import HobbiesSelection from '../components/HobbiesSelection'
import FileUploader from '../components/FileUploader'
import Location from '../components/Location'
import { useDropzone } from 'react-dropzone'

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [hobbies, setHobbies] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    // const [cities, setCities] = useState([]);
    const [iso2, setIso2] = useState({
        countryIso:"",
        stateIso:"",
        cityIso:""
    })
    const [location, setLocation] = useState({
        country: "",
        state: "",
        city:""
    })
    const hobbiesList = [
        "Reading", "Writing", "Gaming", "Cooking", "Photography",
        "Traveling", "Music", "Dancing", "Painting", "Sports",
        "Gardening", "Coding", "Hiking", "Swimming", "Chess",
        "Yoga", "Meditation", "Crafts", "Blogging", "Cycling"
    ];
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm()

    const API_KEY = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";

    // location country function
    const handleCountryChange = async (event) => {
        setLocation((prev) => ({ ...prev, country: event.target.value }))
        const selected = countries.find(
            (country) => country.name === event.target.value
        );
        if(!selected){

        }
        setIso2((prev)=>({...prev, countryIso:selected.iso2}))
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", API_KEY);

        const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow",
        };
        try {
            const response = await fetch(`https://api.countrystatecity.in/v1/countries/${selected?.iso2}/states`, requestOptions);
            const data = await response.json()
            setStates(data)
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    }
    

    const fetchCountries = async () => {
        const headers = new Headers();
        headers.append("X-CSCAPI-KEY", API_KEY);

        const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow",
        };
        try {
            const response = await fetch(
                `https://api.countrystatecity.in/v1/countries`,
                requestOptions
            );
            const data = await response.json();
            // console.log("api call");
            setCountries(data);
            setStates([])
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    };

    

    const handleStateChange = async (event) => {
        setLocation((prev) => ({ ...prev, state: event.target.value }))
    //     const selected = states.find(
    //         (state) => state.name === event.target.value
    //     );
    //     setIso2((prev)=>({...prev, stateIso:selected.iso2}))
    //     const headers = new Headers();
    //     headers.append("X-CSCAPI-KEY", API_KEY);

    //     const requestOptions = {
    //         method: "GET",
    //         headers: headers,
    //         redirect: "follow",
    //     };
    //     try {
    //         const response = await fetch(`https://api.countrystatecity.in/v1/countries/${iso2.countryIso}/states/${iso2.stateIso}/cities`, requestOptions);
    //         // const response = await fetch(`https://api.countrystatecity.in/v1/countries/IN/states/MH/cities`, requestOptions);
    //         const data = await response.json()
    //         setCities(data)
    //         console.log(cities);
            
    //         // console.log("selected state",selected, "selected country",selectedC);
            
    //     } catch (err) {
    //         setError(err.message);
    //         console.error(err);
    //     }
    // }
    // console.log("city iso:",iso2.stateIso);


    // const handleCityChange = async (event)=>{
    //     setLocation((prev) => ({ ...prev, city: event.target.value })) 
    }

    // Hobbies functions
    const handleHobbiesChange = (newHobbies) => {
        setHobbies(newHobbies);
    };

    const handleHobbySelect = (hobby) => {
        let updatedHobbies;
        if (selectedHobbies.includes(hobby)) {
            updatedHobbies = selectedHobbies.filter(h => h !== hobby);
        } else {
            updatedHobbies = [...selectedHobbies, hobby];
        }
        setSelectedHobbies(updatedHobbies);
        handleHobbiesChange(updatedHobbies);
    };

    const removeHobby = (hobby) => {
        const updatedHobbies = selectedHobbies.filter(h => h !== hobby);
        setSelectedHobbies(updatedHobbies);
        handleHobbiesChange(updatedHobbies);
    };

    // FileUploader function
    const onDrop = useCallback((acceptedFiles) => {
        setError("")
        console.log("file");
        
        if (acceptedFiles === "") {
            console.log("Please enter any file");
            
        }
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }))]);
    }, []);

    const onDropRejected = useCallback((fileRejections) => {
        const errorMessage = fileRejections
        if (errorMessage) {
            setError("*Max size should be: 2MB")
        }
    }, []);

    const removeFile = (fileRemove) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileRemove.name))
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDropRejected,
        maxSize: 2 * 1024 * 1024,
        multiple: true,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".gif"],
            "application/pdf": [".pdf"],
        },
    });

    const onSubmit = (data) => {
        if (data.password === data.confirmPassword) {
            console.log({
                ...data,
                "hobbies": { ...hobbies },
                "location": { ...location },
                "Documents": { ...files }
            })
            console.log(isSubmitted);
            
            // const userData = {
            //     ...data,
            //     "hobbies": { ...hobbies },
            //     "location": { ...location },
            //     "Documents": { ...files }
            // }
            localStorage.setItem("User_Details", JSON.stringify(userData))
            console.log(errors);
            
        } else {
            alert("Passwords do not match")
        }
    }
    // console.log("outside", isSubmitted);

    setTimeout(()=>{onSubmit, {isSubmitted: false}}, 3000)

    useEffect(() => {
        fetchCountries();
    }, []);


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
                <Location
                    countries={countries}
                    states={states}
                    // cities={cities}
                    location={location}
                    handleCountryChange={handleCountryChange}
                    handleStateChange={handleStateChange}
                    // handleCityChange={handleCityChange}
                />
                {/* Categories */}
                <HobbiesSelection
                    hobbiesList={hobbiesList}
                    selectedHobbies={selectedHobbies}
                    handleHobbySelect={handleHobbySelect}
                    removeHobby={removeHobby} />
                {/* Drag and drop */}
                <FileUploader
                    files={files}
                    setFiles={setFiles}
                    removeFile={removeFile}
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                    error={error}
                />

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
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SignUpForm;
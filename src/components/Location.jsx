import React from "react";
import { useForm } from "react-hook-form"

const Location = ({ countries, states, handleCountryChange, location, handleStateChange }) => {
    const {register, formState:{errors}} = useForm()
    console.log(errors);
    
    return (
        <>
            {/* Countries */}
            <div className="w-full mx-auto mt-1">
                <label className="text-gray-800 font-semibold">Country</label>
                <select
                {...register("country", { required: "*This field is required" })}
                    id="country"
                    value={location.country}
                    onChange={handleCountryChange}
                    className="block w-full px-4 py-2 border border-gray-300 h-12 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select a Country</option>
                    {
                        countries && countries.length > 0 ? (
                            countries.map((country, index) => (
                                <option key={index} value={country.name}>
                                    {country.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>Fetching countries...</option>
                        )
                    }
                    {errors.country && <span className='text-sm text-red-500'>{errors.country.message}</span>}
                </select>
            </div>
            {/* States */}
            <div className="w-full mx-auto mt-1">
                <label className="text-gray-800 font-semibold">State</label>
                <select
                    id="state"
                    value={location.state}
                    onChange={handleStateChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md h-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pointer-events-auto"
                >
                    <option value="" disabled>
                        Select an State
                    </option>
                    {states.map((state, index) => (
                        <option key={index} value={state.name}>
                            {state.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Cities */}
            {/* <div className="w-full mx-auto mt-1">
                <label className="text-gray-800 font-semibold">City</label>
                <select
                    id="city"
                    value={location.city}
                    onChange={handleCityChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md h-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pointer-events-auto"
                >
                    <option value="" disabled>
                        Select an City
                    </option>
                    {cities.map((city, index) => (
                        <option key={index} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div> */}
        </>

    );
};

export default Location;

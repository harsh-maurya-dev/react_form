import React from "react";

const Location = ({ countries, states, handleCountryChange, location, handleStateChange }) => {
    return (
        <>
            {/* Countries */}
            <div className="w-full mx-auto mt-1">
                <label className="text-gray-800 font-semibold">Country</label>
                <select
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
                    {states.map((states, index) => (
                        <option key={index} value={states.name}>
                            {states.name}
                        </option>
                    ))}
                </select>
            </div>
        </>

    );
};

export default Location;

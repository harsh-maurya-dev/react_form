import React, { useEffect, useState } from "react";

const Location = () => {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedStates, setSelectedStates] = useState("");
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state


    const API_KEY = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";
    // console.log(api_key);



    // const api_key = import.meta.env.REACT_APP_API_KEY
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
            setCountries(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCountryChange = async (event) => {
        setSelectedCountry(event.target.value)

        const selected = countries.find(
            (country) => country.name === event.target.value
        );
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
        } finally {
            setLoading(false);
        }
    }

    const handleStateChange = async (event) => {
        setSelectedStates(event.target.value);

    }

    useEffect(() => {
        fetchCountries();
    }, []);

    return (
        <>
            {/* Countries */}
            <div className="w-full mx-auto mt-1">
                <label className="text-gray-800 font-semibold">Country</label>
                {/* {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : ( */}
                    <select
                        id="options"
                        value={selectedCountry}
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
                {/* )} */}
            </div>
            {/* States */}
            <div className="w-full mx-auto mt-1">
                <label className="text-gray-800 font-semibold">State</label>
                <select
                    id="options"
                    value={selectedStates}
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

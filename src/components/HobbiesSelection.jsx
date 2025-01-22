import React, { useState } from 'react';

const HobbiesSelection = ({ onHobbiesChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHobbies, setSelectedHobbies] = useState([]);

    const hobbiesList = [
        "Reading", "Writing", "Gaming", "Cooking", "Photography",
        "Traveling", "Music", "Dancing", "Painting", "Sports",
        "Gardening", "Coding", "Hiking", "Swimming", "Chess",
        "Yoga", "Meditation", "Crafts", "Blogging", "Cycling"
    ];

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleHobbySelect = (hobby) => {
        let updatedHobbies;
        if (selectedHobbies.includes(hobby)) {
            updatedHobbies = selectedHobbies.filter(h => h !== hobby);
        } else {
            updatedHobbies = [...selectedHobbies, hobby];
        }
        setSelectedHobbies(updatedHobbies);
        onHobbiesChange(updatedHobbies);
    };

    const removeHobby = (hobby) => {
        const updatedHobbies = selectedHobbies.filter(h => h !== hobby);
        setSelectedHobbies(updatedHobbies);
        onHobbiesChange(updatedHobbies);
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-gray-800 font-semibold">Hobbies</label>
            
            {/* Dropdown Button */}
            <div className="relative">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                            {selectedHobbies.length === 0 ? 'Select your hobbies' : `${selectedHobbies.length} hobbies selected`}
                        </span>
                        <svg
                            className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.355a.75.75 0 111.04 1.084l-4 3.615a.75.75 0 01-1.04 0l-4-3.615a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="p-2">
                            {hobbiesList.map((hobby) => (
                                <div
                                    key={hobby}
                                    onClick={() => handleHobbySelect(hobby)}
                                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedHobbies.includes(hobby)}
                                        onChange={() => {}}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                    />
                                    <span className="text-gray-700">{hobby}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Selected Hobbies Tags */}
            {selectedHobbies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedHobbies.map((hobby) => (
                        <div
                            key={hobby}
                            className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                            <span>{hobby}</span>
                            <button
                                type="button"
                                onClick={() => removeHobby(hobby)}
                                className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HobbiesSelection;
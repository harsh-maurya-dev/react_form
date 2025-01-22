import React from "react";
import { AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai'

const FileUploader = ({files, removeFile, getInputProps, getRootProps, isDragActive, error}) => {

    return (
        <div className="w-full bg-white rounded-md">
            <label className="text-gray-800 font-semibold">Upload Documents</label>
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-400 rounded-md p-6 flex flex-col items-center mt-2 justify-center cursor-pointer hover:border-blue-500"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <>
                        <AiOutlineCloudUpload className="h-20 w-20 text-gray-500" />
                        <p className="text-blue-500">Drop the files here...</p>
                    </>
                ) : (
                    <>
                        <AiOutlineCloudUpload className="h-20 w-20 text-gray-500" />
                        <p className="text-gray-500 text-center">
                            Drag and drop files here <br />or click to select files (Max size: 2MB)
                        </p>
                    </>
                )}
            </div>

            {/* Display Error */}
            {error && (
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}

            {files.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Selected Files:
                    </h2>
                    <ul className="list-inside text-gray-700">
                        {files.map((file, index) => (
                            <li key={index} className="text-sm mb-2">
                                <div className="flex justify-between">
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                    <AiOutlineClose className="font-semibol text-xl cursor-pointer text-red-500" onClick={() => removeFile(file)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/* 
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        {files.map((file, index) => (
                            <div key={index} className="border rounded-md p-2">
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    className="w-full h-24 object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default FileUploader;

import React, { useState } from "react";
import axios from "axios";
import {
    bytesToReadableFormat,
    calculateTotalDuration,
    getDuration,
    secondsToMMSS,
} from "../utils/other";
import { ScaleLoader } from "react-spinners";

export interface FileWithMetadata {
    file: File;
    metaData: {
        duration: number;
        fileName: string;
        fileSize: number;
        fileType: string;
    };
}

interface Props {
    fetchAudioFiles: () => void;
}

const UploadForm = ({ fetchAudioFiles }: Props) => {
    const [selectedFiles, setSelectedFiles] = useState<
        FileWithMetadata[] | null
    >(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [warning, setWarning] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setWarning(null);
        if (e.target.files) {
            const files: FileList = e.target.files;
            const filesWithMetadata: FileWithMetadata[] = [];

            // get metadata for each file and store it in an array
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const duration = await getDuration(file);
                // const duration = 0;
                const fileName = file.name;
                const fileSize = file.size;
                const fileType = file.type;

                filesWithMetadata.push({
                    file,
                    metaData: {
                        duration,
                        fileName,
                        fileSize,
                        fileType,
                    },
                });
            }

            setSelectedFiles(filesWithMetadata);
        }
    };

    const handleUpload = async () => {
        if (!selectedFiles) {
            alert("Please select files to upload.");
            return;
        }

        // If total duration is more than 10 minutes, don't upload
        if (calculateTotalDuration(selectedFiles) > 600) {
            setWarning("Total duration of files should not exceed 10 minutes.");
            return;
        }

        const formData = new FormData();
        // add files to formData along with their metadata
        selectedFiles.forEach((fileWithMetadata) => {
            formData.append("files", fileWithMetadata.file);
            formData.append(
                "metadata",
                JSON.stringify(fileWithMetadata.metaData)
            );
        });

        try {
            setLoading(true);
            await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // console.log(res.data.uploaded_urls);
            // console.log("Files uploaded successfully");
            fetchAudioFiles();
            setSelectedFiles(null);
            setLoading(false);
        } catch (error) {
            console.error("Error uploading files:", error);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mx-auto">
            <div className="flex items-center justify-center w-full bg-grey-lighter -rotate-1">
                <label className="flex flex-col items-center w-full px-4 py-6 tracking-wide text-white uppercase border rounded-lg shadow-lg cursor-pointer bg-white/10 border-blue hover:bg-blue hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-white/20">
                    <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                        Upload audio files
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        accept="audio/*"
                        multiple
                        onChange={handleFileChange}
                    />
                </label>
            </div>
            {selectedFiles && (
                <div className="w-full mt-5">
                    <hr className="w-full h-[1px] my-2 bg-white/50 -rotate-1" />
                    <h3 className="mx-auto font-semibold text white">
                        Selected Files:
                    </h3>
                    <ul className="flex flex-col divide-y divide-slate-50/50">
                        {Array.from(selectedFiles).map((file, index) => (
                            <li
                                key={index}
                                className="flex flex-row justify-between w-full pb-2"
                            >
                                <span>-{" " + file.metaData.fileName} </span>
                                <span>
                                    <span className="opacity-70">
                                        {file.metaData.fileType}
                                    </span>
                                    {" - "}
                                    {bytesToReadableFormat(
                                        file.metaData.fileSize
                                    )}{" "}
                                    - {secondsToMMSS(file.metaData.duration)}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {warning && (
                <div className="w-full mt-5 bg-yellow-300 -rotate-1">
                    <hr className="w-full h-[2px]  bg-orange-500/50 " />

                    <p className="py-2 text-center text-black">
                        {warning + " "}{" "}
                        <span
                            onClick={() => {
                                setWarning(null);
                                setSelectedFiles(null);
                            }}
                            className="text-blue-500 underline cursor-pointer hover:text-blue-600"
                        >
                            reset
                        </span>
                    </p>
                    <hr className="w-full h-[2px]  bg-orange-500/50 " />
                </div>
            )}

            <button
                onClick={handleUpload}
                className="px-16 py-4 my-5 transition-all duration-150 border border-red-500 rounded-lg hover:border-white hover:bg-red-500 hover:text-white hover:scale-105"
            >
                {!loading ? (
                    <span>Upload</span>
                ) : (
                    <ScaleLoader color={"#fff"} loading={loading} height={30} />
                )}
            </button>
        </div>
    );
};

export default UploadForm;

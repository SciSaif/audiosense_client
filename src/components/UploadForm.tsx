import React, { useState } from "react";
import axios from "axios";
import {
    bytesToReadableFormat,
    // getDuration,
    secondsToMMSS,
} from "../utils/other";

interface FileWithMetadata {
    file: File;
    metaData: {
        duration: number;
        fileName: string;
        fileSize: number;
        fileType: string;
    };
}

const UploadForm: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<
        FileWithMetadata[] | null
    >(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files: FileList = e.target.files;
            const filesWithMetadata: FileWithMetadata[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // const duration = await getDuration(file);
                const duration = 0;
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
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_API_URL}/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(res.data.uploaded_urls);
            console.log("Files uploaded successfully");
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <div>
            <input
                type="file"
                // accept="audio/*"
                multiple
                onChange={handleFileChange}
            />
            {selectedFiles && (
                <div>
                    <h3>Selected Files:</h3>
                    <ul>
                        {Array.from(selectedFiles).map((file, index) => (
                            <li key={index}>
                                {file.metaData.fileName} -{" "}
                                {file.metaData.fileType} -{" "}
                                {bytesToReadableFormat(file.metaData.fileSize)}{" "}
                                - {secondsToMMSS(file.metaData.duration)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadForm;

import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import AudioTable from "./components/AudioTable";
import axios from "axios";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";
// import WarningBanner from "./components/WarningBanner";
// import { calculateTotalDuration } from "./utils/other";

// "files": [
//     {
//         "duration": 88,
//         "fileSize": 1420797,
//         "fileType": "audio/mpeg",
//         "filename": "remorse.mp3",
//         "id": 1,
//         "url": "https://c304b0b64c5b4bf1672c39cc0c99b803.r2.cloudflarestorage.com/audiosense/uploads/26-08-2023_10-14-59_remorse.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=fd27994874824e12dcd375564eefa81c%2F20230826%2Fapac%2Fs3%2Faws4_request&X-Amz-Date=20230826T044519Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c592f5d3350e7cf0ab2f0e16e5254ba73f4610b56fa6cb20b6cd18766fd62487"
//     }
// ]

export interface IAudioFile {
    id: number;
    url: string;
    fileSize: number;
    fileType: string;
    filename: string;
    duration: number;
    uploadDate: string;
}

const App = () => {
    const [audioFiles, setAudioFiles] = useState<IAudioFile[]>([]);
    const [resetLoading, setResetLoading] = useState<boolean>(false);

    const fetchAudioFiles = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_URL}/getFiles`
        );

        console.log(res.data);
        const audioList: IAudioFile[] = res.data.files;
        setAudioFiles(audioList);
    };

    const resetDatabase = async () => {
        try {
            setResetLoading(true);
            await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/reset`);
            setResetLoading(false);
        } catch (err) {
            console.log(err);
            setResetLoading(false);
        }

        fetchAudioFiles();
    };

    useEffect(() => {
        fetchAudioFiles();
    }, []);

    return (
        <div className="w-full min-h-screen p-4 pt-20 text-white bg-primary">
            <div className="flex flex-col items-center justify-center w-full mb-10">
                <h1 className="mb-4 text-2xl font-bold text-center text-red-500 md:text-3xl lg:text-5xl w-fit">
                    AudioSense
                </h1>

                <hr className="w-full h-1 mb-2 bg-red-500 -rotate-1" />
                <hr className="w-full h-1 bg-red-500 -rotate-1" />
            </div>
            <div className="max-w-[650px] mb-10 flex flex-col justify-center items-center mx-auto">
                <UploadForm fetchAudioFiles={fetchAudioFiles} />

                {/* <audio controls>
                <source src={signedAudioURL} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio> */}
                <AudioTable audioFiles={audioFiles} />
            </div>

            <div
                onClick={resetDatabase}
                className="relative flex flex-col items-center justify-center p-2 transition cursor-pointer w-fit group "
            >
                <div className="text-blue-500 w-fit hover:text-red-500 hover:rotate-90 hover:scale-105">
                    <ArrowPathIcon width={30} height={30} />
                </div>
                <div
                    className={twMerge(
                        "absolute hidden text-sm text-center text-blue-500 group-hover:block hover:text-red-500 -top-10",
                        resetLoading && "animate-pulse block"
                    )}
                >
                    {resetLoading ? "Resetting Database..." : "Reset Database"}
                </div>
            </div>
            <hr className="w-full h-1 mb-2 bg-red-500 -rotate-1" />
            <hr className="w-full h-1 bg-red-500 -rotate-1" />
        </div>
    );
};

export default App;

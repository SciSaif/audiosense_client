import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import AudioTable from "./components/AudioTable";
import axios from "axios";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { twMerge } from "tailwind-merge";

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

    // function to fetch all the audio files from the database
    const fetchAudioFiles = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_REACT_APP_API_URL}/getFiles`
        );

        // console.log(res.data);
        const audioList: IAudioFile[] = res.data.files;
        setAudioFiles(audioList);
    };

    // function to reset the database (delete all the audio files) from s3 and database
    const resetDatabase = async () => {
        try {
            setResetLoading(true);
            await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/reset`);
            setResetLoading(false);
        } catch (err) {
            console.log(err);
            setResetLoading(false);
        }

        // fetch the audio files again to update the table
        fetchAudioFiles();
    };

    useEffect(() => {
        fetchAudioFiles();
    }, []);

    return (
        <div className="w-full min-h-screen p-4 pt-20 text-white bg-primary">
            <header className="flex flex-col items-center justify-center w-full mb-10">
                <h1 className="mb-4 text-2xl font-bold text-center text-red-500 md:text-3xl lg:text-5xl w-fit">
                    AudioSense
                </h1>

                <hr className="w-full h-1 mb-2 bg-red-500 -rotate-1" />
                <hr className="w-full h-1 bg-red-500 -rotate-1" />
            </header>
            <main className="max-w-[650px] mb-10 flex flex-col justify-center items-center mx-auto">
                <UploadForm fetchAudioFiles={fetchAudioFiles} />

                {audioFiles.length > 0 && (
                    <AudioTable audioFiles={audioFiles} />
                )}
            </main>

            <footer>
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
                        {resetLoading
                            ? "Resetting Database..."
                            : "Reset Database"}
                    </div>
                </div>
                <hr className="w-full h-1 mb-2 bg-red-500 -rotate-1" />
                <hr className="w-full h-1 bg-red-500 -rotate-1" />
                <div className="flex flex-row justify-between w-full mt-2 opacity-75 -rotate-1">
                    <div>
                        <span>Created by: </span> <span>Saifullah Rahman</span>
                    </div>
                    <div>
                        <a
                            className="underline hover:underline-offset-4 hover:text-blue-500"
                            href="https://github.com/SciSaif/audiosense_client"
                            target="_blank"
                        >
                            {" "}
                            Github{" "}
                        </a>{" "}
                        {" | "}{" "}
                        <a
                            className="underline hover:underline-offset-4 hover:text-blue-500"
                            href="https://www.linkedin.com/in/scisaif/"
                            target="_blank"
                        >
                            {" "}
                            LinkedIn{" "}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;

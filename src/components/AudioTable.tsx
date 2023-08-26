import React, { useState } from "react";
import { IAudioFile } from "../App";
import {
    bytesToReadableFormat,
    convertDate,
    secondsToMMSS,
} from "../utils/other";

interface Props {
    audioFiles: IAudioFile[];
}

const AudioTable = ({ audioFiles }: Props) => {
    const [currentAudio, setCurrentAudio] = useState<string | null>(null);

    // play the audio file when the play button is clicked
    const playAudio = (audioUrl: string) => {
        if (currentAudio === audioUrl) {
            setCurrentAudio(null); // Stop playing if the same audio is clicked again
        } else {
            setCurrentAudio(audioUrl);
        }
    };

    return (
        <table className="table w-full border border-white ">
            <thead>
                <tr>
                    <th></th> {/* Empty column for the play button */}
                    <th className="min-w-[100px]">Name</th>
                    <th className="w-[80px]">Size</th>
                    <th>Duration</th>
                    <th>Upload Date</th>
                </tr>
            </thead>
            <tbody className="">
                {audioFiles.map((audio) => (
                    <tr key={audio.id} className="text-center">
                        <td>
                            <button
                                onClick={() => playAudio(audio.url)}
                                className="px-4 py-2 w-[80px] font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            >
                                {currentAudio === audio.url ? "Pause" : "Play"}
                            </button>
                            {currentAudio === audio.url && (
                                // should not be visible but should play the audio
                                <audio controls autoPlay className="hidden ">
                                    <source src={audio.url} type="audio/mpeg" />
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            )}
                        </td>
                        <td>{audio.filename}</td>
                        <td>{bytesToReadableFormat(audio.fileSize)} </td>
                        <td>{secondsToMMSS(audio.duration)} </td>
                        <td>{convertDate(audio.uploadDate)} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AudioTable;

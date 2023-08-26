import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import AudioTable, { AudioMetadata } from "./components/AudioTable";
import AudioPlayer from "./components/AudioPlayer";
import WarningBanner from "./components/WarningBanner";
import { calculateTotalDuration } from "./utils/other";

const App: React.FC = () => {
    const [audioList] = useState<AudioMetadata[]>([]);
    const [selectedAudio] = useState<string | null>(null);

    // const handleUpload = (files: FileList) => {
    //     // Upload logic and update audioList state
    // };

    // const handleAudioClick = (audioUrl: string) => {
    //     setSelectedAudio(audioUrl);
    // };

    return (
        <div className="container p-4 mx-auto">
            <h1 className="mb-4 text-2xl font-bold">Audio Dashboard</h1>
            <UploadForm />

            {/* <audio controls>
                <source src={signedAudioURL} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio> */}
            <AudioTable audioList={audioList} />
            <WarningBanner totalDuration={calculateTotalDuration(audioList)} />
            {selectedAudio && <AudioPlayer audioUrl={selectedAudio} />}
        </div>
    );
};

export default App;

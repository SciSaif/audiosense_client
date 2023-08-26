import { AudioMetadata } from "../components/AudioTable";

export function calculateTotalDuration(audioList: AudioMetadata[]): number {
    return audioList.reduce(
        (totalDuration, audio) => totalDuration + audio.duration,
        0
    );
}

// function to get the duration of the audio file
export const getDuration = (file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.preload = "metadata";
        audio.src = URL.createObjectURL(file);
        audio.onloadedmetadata = () => {
            resolve(audio.duration);
        };
        audio.onerror = (error) => {
            reject(error);
        };
    });
};

export function bytesToReadableFormat(bytes: number): string {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex += 1;
    }

    // Format the size with up to 2 decimal places
    const formattedSize = size.toFixed(2);
    return `${formattedSize} ${units[unitIndex]}`;
}

export function secondsToMMSS(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
}

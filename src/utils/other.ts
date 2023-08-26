import { FileWithMetadata } from "../components/UploadForm";

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

// convert Sat, 26 Aug 2023 04:45:02 GMT to 26/08/2023 04:45
export function convertDate(date: string) {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const hour = d.getHours();
    const min = d.getMinutes();
    // if hour is less than 10, add 0 before it
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    // if min is less than 10, add 0 before it
    const formattedMin = min < 10 ? `0${min}` : min;
    return `${day}/${month}/${year} ${formattedHour}:${formattedMin}`;
}

// function to calculate total duration of all files
export const calculateTotalDuration = (files: FileWithMetadata[]) => {
    let totalDuration = 0;
    files.forEach((file) => {
        totalDuration += file.metaData.duration;
    });

    return totalDuration;
};

interface AudioTableProps {
    audioList: AudioMetadata[];
}

export interface AudioMetadata {
    id: number;
    name: string;
    size: number;
    duration: number;
}

const AudioTable = ({ audioList }: AudioTableProps) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {audioList.map((audio) => (
                    <tr key={audio.id}>
                        <td>{audio.name}</td>
                        <td>{audio.size} KB</td>
                        <td>{audio.duration} mins</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AudioTable;

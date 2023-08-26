interface AudioPlayerProps {
    audioUrl: string;
}

const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
    return (
        <div>
            <audio controls>
                <source src={audioUrl} type="audio/*" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;

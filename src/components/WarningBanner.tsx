interface WarningBannerProps {
    totalDuration: number;
}

const WarningBanner = ({ totalDuration }: WarningBannerProps) => {
    return totalDuration > 10 ? (
        <div className="p-2 text-red-800 bg-red-200">
            Total duration exceeds 10 minutes.
        </div>
    ) : null;
};

export default WarningBanner;

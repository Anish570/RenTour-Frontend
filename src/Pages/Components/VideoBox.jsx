import React, { useState, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const VideoBox = ({ onBrowseClick }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const handleLoadedData = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsError(true);
        setIsLoading(false);
    };

    const handleHowItWorksClick = () => {
        navigate('/about-us');
    };

    const VideoSrc = "/images/video/Footage1.mp4";

    return (
        <div className="relative w-full h-[50dvh] sm:h-[100dvh] overflow-hidden">
            {/* Video Background with Blur */}
            <div className="absolute inset-0">
                {isLoading && !isError && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                        <p className="text-white text-lg">Loading Video...</p>
                    </div>
                )}

                {isError && (
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <p className="text-white font-bold">Failed to Load Video</p>
                    </div>
                )}

                {!isError && (
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover blur-sm"
                        autoPlay
                        muted
                        loop
                        playsInline
                        onLoadedData={handleLoadedData}
                        onError={handleError}
                    >
                        <source src={VideoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">
                <h1 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 tracking-wide">
                    Ready to Experience Smart Renting?
                </h1>
                <p className="text-lg sm:text-xl mb-8 sm:mb-12 max-w-2xl">
                    Join thousands of satisfied customers enjoying premium electronics without the premium price.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        className="bg-black hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                        onClick={onBrowseClick}
                    >
                        Browse Products <FiArrowRight />
                    </button>
                    <button
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all border border-white/20"
                        onClick={handleHowItWorksClick}
                    >
                        How It Works
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoBox;

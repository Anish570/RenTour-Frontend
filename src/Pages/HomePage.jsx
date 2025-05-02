import React, { useEffect, useRef } from "react";
import { FiDollarSign, FiShield, FiSmartphone } from "react-icons/fi";
import CollectionCard from "./Components/CollectionCard";
import NewArrivals from "./Components/NewArrivals";
import VideoBox from "./Components/VideoBox";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
    const collectionRef = useRef(null);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    // updated
    return (
        <>
            {/* VideoBox component without scroll animation */}
            <div>
                <VideoBox scrollToRef={collectionRef} />
            </div>

            {/* NewArrivals component with scroll animation */}
            <div data-aos="fade-up" data-aos-delay="200">
                <NewArrivals />
            </div>

            {/* Why Choose RenTour Section */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white font-sans">
                <div className="max-w-7xl mx-auto">
                    <h2
                        className="text-xl sm:text-3xl font-semibold mb-12 tracking-wider text-center text-gray-800"
                        data-aos="fade-down"
                        data-aos-delay="50"
                    >
                        WHY CHOOSE <span className="text-gray-900">RENTOUR</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Cost Effective */}
                        <div
                            className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] group"
                            data-aos="fade-up"
                            data-aos-delay="150"
                        >
                            <div className="flex justify-center mb-4">
                                <FiDollarSign className="text-3xl text-gray-700 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-center text-gray-800 tracking-wider">COST EFFECTIVE</h3>
                            <p className="text-gray-600 text-center">
                                Save up to 70% compared to buying new. Pay only for the time you need.
                            </p>
                        </div>

                        {/* Reliable Quality */}
                        <div
                            className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] group"
                            data-aos="fade-up"
                            data-aos-delay="250"
                        >
                            <div className="flex justify-center mb-4">
                                <FiShield className="text-3xl text-gray-700 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-center text-gray-800 tracking-wider">RELIABLE QUALITY</h3>
                            <p className="text-gray-600 text-center">
                                All devices are professionally inspected and come with warranties.
                            </p>
                        </div>

                        {/* Latest Models */}
                        <div
                            className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:bg-white transition-all duration-300 transform hover:scale-[1.02] group"
                            data-aos="fade-up"
                            data-aos-delay="350"
                        >
                            <div className="flex justify-center mb-4">
                                <FiSmartphone className="text-3xl text-gray-700 transition-transform duration-300 group-hover:scale-110" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-center text-gray-800 tracking-wider">LATEST MODELS</h3>
                            <p className="text-gray-600 text-center">
                                Regularly updated inventory with newest releases from top brands.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CollectionCard component with scroll animation */}
            <div data-aos="fade-up" data-aos-delay="400">
                <div className="flex flex-col w-full">
                    <h2 className="text-xl sm:text-3xl underline font-semibold mb-6 sm:mb-12 tracking-wider text-center">COLLECTIONS</h2>
                    <CollectionCard />
                </div>
            </div>

            {/* Testimonials Section - Animations Removed */}
            <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-xl sm:text-3xl font-semibold mb-12 tracking-wider text-center text-gray-800">
                        WHAT PEOPLE SAY ABOUT US
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                            <p className="text-gray-600 italic mb-4">
                                "RenTour saved me hundreds when I needed a high-end laptop for a short project. The process was seamless!"
                            </p>
                            <p className="text-gray-800 font-medium">— Sarah K.</p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                            <p className="text-gray-600 italic mb-4">
                                "As a frequent traveler, renting phones for different countries has been a game-changer. Highly recommend!"
                            </p>
                            <p className="text-gray-800 font-medium">— Michael T.</p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                            <p className="text-gray-600 italic mb-4">
                                "The camera equipment I rented was in perfect condition and helped me complete my client project on budget."
                            </p>
                            <p className="text-gray-800 font-medium">— David R.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
import React, { useEffect, useRef } from "react";
import CollectionCard from "./Components/CollectionCard";
import NewArrivals from "./Components/NewArrivals";
import VideoBox from "./Components/VideoBox";
import AOS from "aos";
import "aos/dist/aos.css";
import WhyUs from "./Components/WhyUs";
import Testimonials from "./Components/Testimonials";

const HomePage = () => {
    const collectionRef = useRef(null);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const scrollToCollections = () => {
        collectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            {/* VideoBox component without scroll animation */}
            <div>
                <VideoBox onBrowseClick={scrollToCollections} />
            </div>

            {/* NewArrivals component with scroll animation */}
            <div data-aos="fade-up" data-aos-delay="200">
                <NewArrivals />
            </div>



            {/* CollectionCard component with scroll animation */}
            <div ref={collectionRef} data-aos="fade-up" data-aos-delay="400" className="md:pt-10">
                <CollectionCard />
            </div>

            {/* Why Choose RenTour Section */}
            <WhyUs />

            {/* Testimonials Section - Animations Removed */}
            <Testimonials />
        </>
    );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

const CollectionCard = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchTopSold = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${baseUrl}/products/top-sold`, {
                    timeout: 10000,
                });
                setFilteredProducts(res.data);
            } catch (error) {
                console.error("Error fetching top sold products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopSold();
        AOS.init({
            duration: 1000,
        });
    }, [baseUrl]);

    const skeletonCards = Array(3).fill(0).map((_, i) => (
        <div
            key={i}
            className="bg-white animate-pulse rounded-2xl min-w-[450px] w-[450px] h-[200px] sm:w-[90%] sm:mx-auto lg:h-[70dvh]"
        />
    ));

    return (
        <div className="flex flex-col items-center h-fit py-5 sm:py-14">
            <h2 className="text-xl sm:text-3xl underline font-semibold mb-6 sm:mb-12 tracking-wider text-center">
                CATEGORIES
            </h2>
            <div className="w-full flex flex-row shrink-0 flex-nowrap overflow-x-scroll snap-x md:overflow-hidden sm:flex-col gap-4 py-5 sm:gap-8 sm:py-10">
                {isLoading ? (
                    skeletonCards
                ) : (
                    filteredProducts.map((product, index) => {
                        const isEven = index % 2 === 1;
                        const layoutClass = isEven ? "sm:flex-row-reverse" : "sm:flex-row";
                        const textAlign = isEven ? "items-end text-right" : "items-start text-left";

                        return (
                            <div
                                key={index}
                                className={`snap-start flex ${layoutClass} bg-white items-center p-3 shadow-xl rounded-2xl min-w-[450px] w-[450px] h-[200px] sm:h-[300px] sm:w-[90%] sm:mx-auto lg:h-[70dvh] overflow-hidden transition-all`}
                            >
                                {/* Image */}
                                <div
                                    className="w-1/2 h-[150px] sm:h-[190px] lg:h-[300px]"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <img
                                        src={`${baseUrl}${product.productAvatar}`}
                                        alt={product.name}
                                        loading="lazy"
                                        onError={(e) => {
                                            e.currentTarget.src = "/fallback.png";
                                        }}
                                        className="w-full h-full object-contain transition-all duration-300 ease-in-out"
                                    />
                                </div>

                                {/* Text and Button */}
                                <div className={`w-full lg:w-1/2 flex flex-col p-2 sm:p-4 ${textAlign}`}>
                                    <h2
                                        className="text-xl sm:text-2xl lg:text-3xl text-gray-800 uppercase"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100 + 150}
                                    >
                                        {product.name}
                                    </h2>
                                    <p
                                        className="text-[12px] sm:text-[14px] font-[400] text-gray-700 leading-relaxed"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100 + 300}
                                    >
                                        {product.description}
                                    </p>
                                    <Link
                                        to={`${product.category}/${product.id}`}
                                        className="text-[13px] sm:text-[14px] mt-2 px-6 py-1 border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-300"
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100 + 450}
                                    >
                                        VIEW DETAILS
                                    </Link>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default React.memo(CollectionCard);


import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategory = () => {
    const productCategories = [
        {
            name: "Mobiles",
            // icon: "/featureproducts/mobile.svg",
            path: "/collections/mobiles"
        },
        {
            name: "Laptops",
            // icon: "/featureproducts/laptop.svg",
            path: "/collections/laptops"
        },
        {
            name: "Cameras",
            // icon: "/featureproducts/camera.svg",
            path: "/collections/cameras"
        },
        {
            name: "iPads",
            // icon: "/featureproducts/tablet.svg",
            path: "/collections/ipads"
        },
        {
            name: "Headphones",
            // icon: "/featureproducts/headphone.svg",
            path: "/collections/headphones"
        },
        {
            name: "Drones",
            // icon: "/featureproducts/drone.svg",
            path: "/collections/drones"
        },
        {
            name: "Others",
            path: "/collections/others"
        }
    ];
    return (
        <div className="h-fit sm:h-full flex shrink-0 flex-wrap items-center justify-center w-full gap-x-4 sm:gap-x-7">
            {productCategories.map((product, index) => (
                <Link to={product.path} key={index} className="flex h-full flex-col items-center justify-center ">
                    {/* <img src={product.icon} alt={product.name} className="w-full h-[60%] object-contain" /> */}
                    <h2 className="text-[14px] sm:text-[16px] tracking-wide uppercase roboto-condensed-medium hover:text-gray-500">{product.name}</h2>
                </Link>
            ))}
        </div>
    );
};

export default ProductCategory;

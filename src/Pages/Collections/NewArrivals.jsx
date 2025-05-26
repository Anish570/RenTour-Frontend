import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from "../../Components/ProductCard"

const NewArrivals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${baseUrl}/products/new-arrivals`);
                const sorted = res.data.sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));
                setProducts(sorted);
            } catch (err) {
                console.error('Failed to fetch new arrivals:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [baseUrl]);

    const skeletonCard = Array(8).fill(0).map((_, i) => (
        <div key={i} className="bg-white animate-pulse w-[90%] sm:min-w-[22%] sm:w-[300px] h-[55dvh] rounded-lg shadow-md" />
    ));

    return (
        <div className="min-h-screen px-4 sm:px-12 py-6 sm:py-12">
            <h1 className="text-2xl sm:text-4xl font-bold mb-10 text-center underline">New Arrivals</h1>

            <div className="flex flex-wrap gap-6 justify-center">
                {loading
                    ? skeletonCard
                    : products.map(product => (
                        <ProductCard key={product.item_id} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default NewArrivals;

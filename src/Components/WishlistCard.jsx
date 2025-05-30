import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaCartPlus } from "react-icons/fa";
import { useCart } from "../GlobalState/CartContext";
import axios from "axios";
import { useWishlist } from "../GlobalState/WishContext";

const WishlistCard = ({ productId }) => {
    const { addToCart } = useCart();
    const { removeFromWishlist } = useWishlist();
    const [product, setProduct] = useState(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;


    // Fetch product details using the productId
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${baseUrl}/products/${productId}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product details:", err);
            }
        };

        if (productId) fetchProduct();
    }, [productId, baseUrl]);

    const handleRemove = () => {
        removeFromWishlist(productId);
    };

    if (!product) return null; // Optionally show a skeleton or loading state

    return (
        <div className="bg-white rounded-lg shadow p-4 flex gap-4 items-center justify-between">
            <img
                src={`${baseUrl}${product.productAvatar}`}
                alt={product.name}
                className="w-20 h-20 object-contain"
            />
            <div className="flex-1">
                <h3 className="font-bold">{product.name}</h3>
                <div className="text-sm text-gray-500">
                    ₹{product.offeredPrice}{" "}
                    <span className="line-through text-red-400">
                        ₹{product.originalPrice}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 items-center">
                <button
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    onClick={() => addToCart(product.id, product.offeredPrice)}
                >
                    <FaCartPlus />
                </button>
                <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                    onClick={handleRemove}
                >
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default WishlistCard;

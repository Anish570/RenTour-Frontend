import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../GlobalState/CartContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CartCard = ({ productid, quantity, }) => {
    const { isCartOpen, updateQuantity, removeFromCart } = useCart();
    const [product, setProduct] = useState(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [isRemoving, setIsRemoving] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isSubtracting, setIsSubtracting] = useState(false);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${baseUrl}/products/${productid}`);
                setProduct(res.data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            }
        };

        if (productid) {
            fetchProduct();
        }
    }, [productid, isCartOpen, baseUrl]);

    const isLoggedIn = !!localStorage.getItem("authToken");

    // const handleSubtract = () => {
    //     if (quantity > 1) {
    //         updateQuantity(productid, quantity - 1);
    //     }
    // };
    const handleSubtract = async () => {
        if (quantity > 1) {
            setIsSubtracting(true);
            await updateQuantity(product?.id, quantity - 1);
            setIsSubtracting(false);
        }
    };


    const handleAdd = async () => {
        setIsAdding(true);
        await updateQuantity(product?.id, quantity + 1);
        setIsAdding(false);
    };

    const handleRemove = async () => {
        setIsRemoving(true);
        await removeFromCart(product.id);
        setIsRemoving(false);
    };

    if (!product) return null;


    if (!product) return null;

    return (
        <div className="flex items-center justify-between p-2 border-b">
            <img
                src={`${baseUrl}${product.productAvatar}`}
                alt={product.name}
                className="w-16 h-16 object-contain"
            />
            <div className="flex-1 px-3">
                <h3 className="text-sm font-medium">{product.name}</h3>
                <p className="text-xs text-gray-500">
                    ₹{product.offeredPrice} x {quantity}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-1">
                    <button
                        onClick={() => { handleSubtract() }}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
                        disabled={product.quantity <= 1 || !isLoggedIn || isSubtracting}
                    >
                        {isSubtracting ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-base" />
                        ) : (
                            "-"
                        )}
                    </button>
                    <span>{quantity}</span>
                    <button
                        onClick={() => { handleAdd() }}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 flex items-center justify-center"
                        disabled={product.quantity <= 1 || !isLoggedIn || isAdding}
                    >
                        {isAdding ? (
                            <AiOutlineLoading3Quarters className="animate-spin text-base" />
                        ) : (
                            "+"
                        )}
                    </button>
                </div>
            </div>

            <button
                className="text-red-500 text-sm font-semibold hover:underline disabled:opacity-50 flex items-center gap-1"
                onClick={handleRemove}
                disabled={isRemoving || !isLoggedIn}
            >
                {isRemoving ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                ) : (
                    "Remove"
                )}
            </button>
        </div>
    );
};

export default CartCard;

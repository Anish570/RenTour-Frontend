import React, { useState, useRef, useEffect } from 'react';
import ProductCategory from './ProductsCategories';
import { Link } from 'react-router-dom';
import { useCart } from '../GlobalState/CartContext';
import { FaUser } from 'react-icons/fa6';
import { BsSearch } from "react-icons/bs";
import { GiSelfLove } from "react-icons/gi";
import { BsCart4 } from "react-icons/bs";
import { useWishlist } from '../GlobalState/WishContext';
import { useAuth } from '../GlobalState/AuthContext'; // Add this line based on your setup
import { SiSellfy } from "react-icons/si";
const NavBar = ({ toggleCart }) => {
    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const { user, logout, isLoggedIn } = useAuth(); // Assuming you expose these from your AuthContext
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const wishListItemCount = wishlistItems.length;

    const [showUserMenu, setShowUserMenu] = useState(false);
    const userRef = useRef();

    useEffect(() => {
        const handler = (e) => {
            if (userRef.current && !userRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className='w-full h-[23dvh] sm:h-[25dvh] bg-white'>
            <div className='bg-black text-white w-full h-fit sm:h-[20%] text-[11px] sm:text-[13px] !py-[5px] text-center'>
                NEW ARRIVALS - SPRING-SUMMER 25 - PREMIUM LINEN SUMMER COLLECTIONS
            </div>

            <div className='relative flex items-center w-full h-[40%] sm:h-[50%]'>
                <Link to="/" className='w-full z-1 flex items-center gap-2 sm:gap-4 px-[10px] justify-start md:justify-center'>
                    <img src="/logo.svg" alt="logo" className='h-full w-[30px] sm:w-[40px] md:w-[50px] object-cover ' />
                    <h1 className='lavishly-yours-regular text-3xl sm:text-5xl md:text-6xl font-bold'>RenTour</h1>
                </Link>

                <div className='absolute z-10 right-4 h-full flex top-[50%] -translate-y-[50%] items-center justify-end gap-5 sm:gap-x-8 text-[18px] sm:text-[24px]'>
                    <div className="relative" ref={userRef}>
                        {isLoggedIn ? (
                            <Link to={"/seller"}>
                                <FaUser />
                            </Link>
                            // <>
                            //     <button onClick={() => setShowUserMenu(!showUserMenu)} className='cursor-pointer'>
                            //         <FaUser />
                            //     </button>
                            //     {showUserMenu && (
                            //         <div className="absolute right-0 mt-2 w-auto min-w-fit bg-white border rounded-lg shadow p-2 z-50">
                            //             <div
                            //                 className="font-medium px-2 py-1 flex items-center gap-1 flex-nowrap shrink-0 w-fit text-[12px] md:text-[16px]">
                            //                 <p>👋</p>
                            //                 <p> {user?.username || user?.name || "user"}</p>
                            //             </div>
                            //             <hr className="my-1" />
                            //             <Link
                            //                 to={"https://rentour-seller-ruddy.vercel.app/"}
                            //                 className="w-full flex items-center gap-2 cursor-pointer text-left px-2 py-1 text-[12px] md:text-[16px] hover:bg-red-100 rounded"
                            //             >
                            //                 <SiSellfy className='bg-green-500' />
                            //                 Seller
                            //             </Link>
                            //             <button
                            //                 onClick={logout}
                            //                 className="w-full cursor-pointer text-left px-2 py-1 text-red-600 text-[12px] md:text-[16px] hover:bg-red-100 rounded"
                            //             >
                            //                 Logout
                            //             </button>
                            //         </div>
                            //     )}
                            // </>
                        ) : (
                            <Link to="/auth">
                                <FaUser />
                            </Link>
                        )}
                    </div>

                    <Link to={"/search"} className="">
                        <BsSearch />
                    </Link>

                    <Link to="/wishlist" className='relative'>
                        <GiSelfLove />
                        {wishListItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {wishListItemCount}
                            </span>
                        )}
                    </Link>

                    <div onClick={toggleCart} className='relative cursor-pointer'>
                        <BsCart4 className='text-[16px] sm:text-[26px]' />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItemCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className='w-full h-[30%]'>
                <ProductCategory />
            </div>
        </div>
    );
};

export default NavBar;
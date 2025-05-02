import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../GlobalState/AuthContext";

const SellerDashboard = () => {
    const { user, logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/auth");
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) return null;
    return (

        <div className="bg-gray-100 min-h-screen" >
            {/* Navbar */}
            <nav className="bg-blue-600 text-white p-4" >
                <div className="flex justify-between items-center">
                    <Link to={"/seller"}>
                        <h2 className="text-2xl font-bold">Seller Dashboard</h2>
                    </Link>
                    <div>
                        <span className="mr-4">Hello, {user?.username || user?.name || "user"}</span>
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav >

            {/* Dashboard Content */}
            <div className="container mx-auto p-6" >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Your Posted Products</h3>
                    {/* Button to Add a New Product */}
                    <Link to="add-product">
                        <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
                            Add New Product
                        </button>
                    </Link>
                </div>
                <Outlet />
            </div >
        </div >

    );
};

export default SellerDashboard;

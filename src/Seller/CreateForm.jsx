import React, { useState } from "react";
import axiosInstance, { setAuthToken } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
    const [productData, setProductData] = useState({
        name: "",
        category: "",
        description: "",
        stock: "",
        originalPrice: "",
        offeredPrice: "",
        features: "",
        productAvatar: null,
        images: [],
    });
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleProductAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductData((prev) => ({ ...prev, productAvatar: file }));
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setProductData((prev) => ({
                ...prev,
                images: [...prev.images, ...files],
            }));
            setImagePreviews((prev) => [
                ...prev,
                ...files.map((file) => URL.createObjectURL(file)),
            ]);
        }
    };

    const removeAvatar = () => {
        setProductData((prev) => ({ ...prev, productAvatar: null }));
        setAvatarPreview(null);
    };

    const removeImage = (index) => {
        setProductData((prev) => {
            const newImages = [...prev.images];
            newImages.splice(index, 1);
            return { ...prev, images: newImages };
        });
        setImagePreviews((prev) => {
            const newPreviews = [...prev];
            newPreviews.splice(index, 1);
            return newPreviews;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setAuthToken(token);

            const formData = new FormData();
            formData.append("name", productData.name);
            formData.append("category", productData.category);
            formData.append("description", productData.description);
            formData.append("stock", productData.stock);
            formData.append("originalPrice", productData.originalPrice);
            formData.append("offeredPrice", productData.offeredPrice);
            formData.append("features", productData.features);

            if (productData.productAvatar) {
                formData.append("productAvatar", productData.productAvatar);
            }

            productData.images.forEach((image) => {
                formData.append("images", image);
            });

            const response = await axiosInstance.post("/product/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 201 || response.status === 200) {
                toast.success("🎉 Product uploaded successfully!");

                setProductData({
                    name: "",
                    category: "",
                    description: "",
                    stock: "",
                    originalPrice: "",
                    offeredPrice: "",
                    features: "",
                    productAvatar: null,
                    images: [],
                });
                setAvatarPreview(null);
                setImagePreviews([]);
                navigate("/seller")
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Upload Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to upload product.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Upload New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* TEXT FIELDS */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Other Inputs */}
                {/* Category as Select Dropdown */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Category</label>
                    <select
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="mobiles">Mobiles</option>
                        <option value="laptops">Laptops</option>
                        <option value="cameras">Cameras</option>
                        <option value="headphones">Headphones</option>
                        <option value="ipads">iPads</option>
                        <option value="drones">Drones</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* GRID FIELDS */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={productData.stock}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Original Price</label>
                        <input
                            type="number"
                            name="originalPrice"
                            value={productData.originalPrice}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Offered Price</label>
                        <input
                            type="number"
                            name="offeredPrice"
                            value={productData.offeredPrice}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Features (comma separated)</label>
                        <input
                            type="text"
                            name="features"
                            value={productData.features}
                            onChange={handleChange}
                            placeholder="Feature1, Feature2"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* AVATAR */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Product Avatar (Single Image)</label>
                    <input
                        id="avatarInput"
                        type="file"
                        accept="image/*"
                        onChange={handleProductAvatarChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    {avatarPreview && (
                        <div className="relative inline-block mt-3">
                            <img src={avatarPreview} alt="Avatar Preview" className="w-32 h-32 object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={removeAvatar}
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                ✖
                            </button>
                        </div>
                    )}
                </div>

                {/* MULTIPLE IMAGES */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Product Images (Multiple Images)</label>
                    <input
                        id="imagesInput"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesChange}
                        className="w-full p-2 border rounded-lg"
                    />
                    <div className="flex flex-wrap gap-4 mt-3">
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative inline-block">
                                <img src={preview} alt={`Preview ${index}`} className="w-24 h-24 object-cover rounded-lg" />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SUBMIT */}
                <button
                    onClick={(e) => { handleSubmit(e) }}
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
                >
                    Upload Product
                </button>
            </form>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default CreateForm;

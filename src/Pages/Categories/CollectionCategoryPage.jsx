import React from "react";
import { useParams } from "react-router-dom";
import ProductList from "../../Components/ProductList";

const CollectionCategoryPage = () => {
    const { category } = useParams(); // Gets the category from URL

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-6 capitalize">{category}</h1>
            <ProductList category={[category]} />
        </div>
    );
};

export default CollectionCategoryPage;

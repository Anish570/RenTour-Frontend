import React from 'react'
import ProductList from '../../Components/ProductList'

const Laptops = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-6">Laptops</h1>
            <ProductList category="laptops" />
        </div>
    )
}

export default Laptops
import React from 'react'
import ProductList from '../../Components/ProductList'

const Headphones = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-6">Smart Watches</h1>
            <ProductList category="headphones" />
        </div>
    )
}

export default Headphones
import ProductList from "../../Components/ProductList";


const Others = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-center my-6">Others</h1>
            <ProductList category={["Others"]} />
        </div>
    );
};

export default Others;

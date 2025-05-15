import { PaginatedData, Product } from '@/types';
import ProductCard from './ProductCard';

const ProductsList = ({ products, query, addToCart }: { products: PaginatedData<Product>; query: string; addToCart: (product: Product) => void }) => {
    /* search queries */

    const filteredProducts = products.data.filter((product: Product) => {
        const lowerCaseQuery = query.toLowerCase();
        return product.name.toLowerCase().includes(lowerCaseQuery) || product.description.toLowerCase().includes(lowerCaseQuery);
    });
    return (
        <>
            {filteredProducts.map((product: Product) => (
                <div key={product.id} className="relative cursor-pointer" onClick={() => addToCart(product)}>
                    <ProductCard title={product.name} price={product.price} imgSrc={product.image} active={product.isActive} />
                </div>
            ))}
        </>
    );
};
export default ProductsList;

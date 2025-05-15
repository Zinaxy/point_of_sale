import OrderList from '@/components/OrderList';
import ProductsList from '@/components/ProductsList';
import SearchInput from '@/components/searchInput';
import TopOnItems from '@/components/TopOnItems';
import AppLayout from '@/layouts/app-layout';
import { PaginatedData, Product, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ products, success }: { products: PaginatedData<Product>; success: string }) {
    const [query, setQuery] = useState('');
    const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

    // Add to cart function
    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.product.id === product.id);
            if (existingItem) {
                return prevCart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return [...prevCart, { product, quantity: 1 }];
        });
    };

    // Remove from cart function
    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    };

    // Update quantity function
    const updateQuantity = (productId: number, newQuantity: number) => {
        setCart((prevCart) => prevCart.map((item) => (item.product.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item)));
    };

    // Clear cart function
    const clearCart = () => {
        setCart([]);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col justify-center gap-4 rounded-xl p-4 lg:flex-row">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] w-full rounded-xl border p-8 md:min-h-min lg:w-8/12">
                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            <TopOnItems />
                        </div>
                        <div className="w-full">
                            <SearchInput
                                placeholder="Search Product"
                                onChange={(e: { target: { value: string } }) => setQuery(e.target.value.toLowerCase())}
                            />
                        </div>
                    </div>
                    <div className="my-4 border-b-2" />
                    <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <ProductsList products={products} query={query} addToCart={addToCart} />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] w-full rounded-xl border p-8 md:min-h-min lg:w-4/12">
                    <OrderList cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} clearCart={clearCart} success={success} />
                </div>
            </div>
        </AppLayout>
    );
}

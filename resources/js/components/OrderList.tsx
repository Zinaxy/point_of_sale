import { Product } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import OrderItem from './OrderItem';

const OrderList = ({
    cart,
    removeFromCart,
    clearCart,
    success,
    updateQuantity, // Add this new prop
}: {
    cart: { product: Product; quantity: number }[];
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    success: string;
    updateQuantity: (productId: number, newQuantity: number) => void; // Add this type
}) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = 0;
    const tax = subtotal * 0.07;
    const total = subtotal - discount + tax;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        // Ensure quantity is at least 1
        const validatedQuantity = Math.max(1, newQuantity);
        updateQuantity(productId, validatedQuantity);
    };

    const handlePlaceOrder = async () => {
        if (cart.length === 0) return;

        setIsSubmitting(true);

        try {
            const orderItems = cart.map((item) => ({
                product_id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
            }));

            await router.post(
                '/orders',
                {
                    items: orderItems,
                    subtotal: subtotal,
                    tax: tax,
                    total: total,
                },
                {
                    onSuccess: () => {
                        clearCart();
                        toast.success('Order placed successfully!');
                    },
                    onError: (errors) => {
                        toast.error('Failed to place order');
                    },
                },
            );

            if (success) {
                clearCart();
            }
        } catch (error) {
            console.error('Order submission failed:', error);
            toast.error('An error occurred while placing the order');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="">
            <div className="mt-5 flex flex-row items-center justify-between gap-2 px-5">
                <div className="text-xl font-bold">Current Order</div>
                <button onClick={clearCart} className="mx-1 flex rounded-md bg-red-100 px-4 py-2 text-red-500" disabled={cart.length === 0}>
                    Clear All
                </button>
            </div>
            <div className="mt-5 h-110 overflow-y-auto px-5 py-4">
                {cart
                    .slice()
                    .reverse()
                    .map((item) => (
                        <OrderItem
                            key={item.product.id}
                            item={item}
                            removeFromCart={removeFromCart}
                            handleQuantityChange={(e) => {
                                const value = e.target.value;
                                const quantity = value === '' ? 1 : parseInt(value, 10);
                                handleQuantityChange(item.product.id, isNaN(quantity) ? 1 : quantity);
                            }}
                            onIncrement={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            onDecrement={() => handleQuantityChange(item.product.id, Math.max(1, item.quantity - 1))}
                        />
                    ))}
            </div>
            <div className="mt-5 px-5">
                <div className="rounded-md py-4 shadow-lg">
                    <div className="flex justify-between px-4">
                        <span className="text-sm font-semibold">Subtotal</span>
                        <span className="font-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between px-4">
                        <span className="text-sm font-semibold">Discount</span>
                        <span className="font-bold">- ${discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between px-4">
                        <span className="text-sm font-semibold">Sales Tax</span>
                        <span className="font-bold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t-2 px-4 py-2">
                        <span className="text-2xl font-semibold">Total</span>
                        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div className="mt-5 px-5">
                <div className="rounded-md px-2 py-2 shadow-lg">
                    <div className="flex flex-row items-center justify-between">
                        <button
                            onClick={clearCart}
                            disabled={cart.length === 0}
                            className="mx-1 rounded-md bg-red-100 px-4 py-2 text-red-500 disabled:opacity-50"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handlePlaceOrder}
                            disabled={cart.length === 0 || isSubmitting}
                            className="rounded-md bg-yellow-500 px-4 py-2 text-center font-semibold text-white shadow-lg disabled:opacity-50"
                        >
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderList;

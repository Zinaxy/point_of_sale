import { Product } from '@/types';
import { Image, MinusIcon, PlusIcon, X } from 'lucide-react';
import { Input } from './ui/input';

const OrderItem = ({
    item,
    removeFromCart,
    handleQuantityChange,
    onIncrement,
    onDecrement,
}: {
    item: { product: Product; quantity: number };
    removeFromCart: (productId: number) => void;
    handleQuantityChange: React.ChangeEventHandler<HTMLInputElement>;
    onIncrement: () => void;
    onDecrement: () => void;
}) => {
    return (
        <div className="mb-4 flex flex-row items-center justify-between">
            <div className="flex w-full flex-row items-center md:w-2/5">
                {item.product.image ? (
                    <img
                        src={'files/products/' + item.product.image || 'default-150x150.png'}
                        className="h-10 w-10 rounded-md object-cover"
                        alt={item.product.name}
                    />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        <Image className="h-5 w-5" />
                    </div>
                )}
                <span className="ml-4 text-sm font-semibold">{item.product.name}</span>
            </div>
            <div className="flex w-40 items-center justify-between">
                <button onClick={onDecrement} className="rounded-md bg-gray-400 p-2 text-gray-50 hover:bg-gray-500">
                    <MinusIcon className="h-4 w-4" />
                </button>
                <Input type="number" name="quantity" className="w-16 text-center" value={item.quantity} onChange={handleQuantityChange} min={1} />
                <button onClick={onIncrement} className="rounded-md bg-gray-400 p-2 text-gray-50 hover:bg-gray-500">
                    <PlusIcon className="h-4 w-4" />
                </button>
            </div>
            <div className="w-16 text-center text-lg font-semibold">${(item.product.price * item.quantity).toFixed(2)}</div>
            <button onClick={() => removeFromCart(item.product.id)} className="cursor-pointer text-red-500 hover:text-red-300">
                <X className="h-5 w-5" />
            </button>
        </div>
    );
};

export default OrderItem;

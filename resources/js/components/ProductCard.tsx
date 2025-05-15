import { Image } from 'lucide-react';
import { Badge } from './ui/badge';

const ProductCard = ({ title, active, imgSrc, price }: { title: string; active: boolean; imgSrc: string | null; price: number | null }) => {
    return (
        <div className="flex h-32 cursor-pointer flex-col justify-between rounded-md border border-gray-200 px-3 py-3 hover:border-2 hover:border-red-500 hover:shadow-2xl">
            <div className="flex flex-row items-center justify-between">
                <div className="0 font-bold">{title}</div>
                <span className="text-sm font-light text-gray-400">
                    {active ? (
                        <>{/* <Badge className="rounded bg-emerald-400 text-white">active</Badge> */}</>
                    ) : (
                        <Badge className="rounded bg-red-400 text-white">deactivated</Badge>
                    )}
                </span>
            </div>
            <div className="flex flex-row items-center justify-between">
                <span className="self-end text-lg font-bold text-yellow-500">${price}</span>
                {imgSrc == null ? (
                    <>
                        <Image className="h-20 w-20 rounded-md object-cover text-gray-600 dark:text-gray-300" />
                    </>
                ) : (
                    <>
                        <img src={`files/products/${imgSrc}`} className="h-20 w-20 rounded-md object-cover" alt={title} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCard;

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaginatedData, Product, Shop } from '@/types';
import { useForm } from '@inertiajs/react';
import { Loader, PlusCircleIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

const AddInventory = ({ product, shops }: { product: Product; shops: PaginatedData<Shop> }) => {
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        product_id: product.id,
        shop_id: '',
        cases: '',
        units: '',
        price: '',
    });
    const createInventory: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('inventory.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start text-emerald-500 hover:text-emerald-600">
                    {product.inventories.length} Add Inventory <PlusCircleIcon className="ml-2 h-4 w-10" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Inventory</DialogTitle>
                    <DialogDescription>Add inventory details for {product.name} to your shops</DialogDescription>
                </DialogHeader>

                <form className="space-y-6" onSubmit={createInventory}>
                    {/* Product Name (readonly) */}
                    <div className="grid gap-3">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" type="text" value={product.name} disabled />
                    </div>

                    {/* Shop Selection */}
                    <div className="grid gap-3">
                        <Label htmlFor="shop">Shop Name</Label>
                        <Select value={data.shop_id} onValueChange={(value) => setData('shop_id', value)}>
                            <SelectTrigger id="shop" className={`w-full ${errors.cases ? 'border-red-500' : ''}`}>
                                <SelectValue placeholder="Select a shop" />
                            </SelectTrigger>
                            <SelectContent>
                                {shops.map((shop: Shop) => (
                                    <SelectItem value={String(shop.id)} key={shop.id}>
                                        {shop.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.shop_id} className="mt-2" />
                    </div>

                    {/* Cases and Items per Case */}
                    <div className="mt-2 flex flex-col gap-4 md:flex-row">
                        <div className="grid w-full gap-3">
                            <Label htmlFor="cases">Cases</Label>
                            <Input
                                id="cases"
                                type="number"
                                min="0"
                                value={data.cases}
                                onChange={(e) => setData('cases', e.target.value)}
                                disabled={processing}
                                className={errors.cases ? 'border-red-500' : ''}
                            />
                            <InputError message={errors.cases} className="mt-2" />
                        </div>
                        <div className="grid w-full gap-3">
                            <Label htmlFor="units">Items per Case</Label>
                            <Input
                                id="units"
                                type="number"
                                min="0"
                                value={data.units}
                                onChange={(e) => setData('units', e.target.value)}
                                disabled={processing}
                                className={errors.units ? 'border-red-500' : ''}
                            />
                            <InputError message={errors.units} className="mt-2" />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="grid gap-3">
                        <Label htmlFor="price">Price per Unit (USD)</Label>
                        <div className="relative">
                            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500">$</span>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                disabled={processing}
                                className={`pl-8 ${errors.price ? 'border-red-500' : ''}`}
                            />
                        </div>
                        <InputError message={errors.price} className="mt-2" />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="outline" onClick={closeModal}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={processing} className="min-w-[120px]">
                            {processing ? (
                                <span className="flex items-center gap-2">
                                    <Loader className="h-4 w-4 animate-spin" />
                                    Saving...
                                </span>
                            ) : (
                                'Save Inventory'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddInventory;
